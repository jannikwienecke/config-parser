import * as fs from 'fs';
import * as plist from 'plist';
import * as xml2js from 'xml2js';
import * as inquirer from 'inquirer';
import { AttributeManipulation } from './AttributeManipulation';
import { AttributeManipulationBuldFile } from './AttributeManipulationBuildFile';
import ANDROID_BUILD_NEW_LINES from './config/android-build';
import ANDROID_MANIFEST_ATTRIBUTES from './config/android-manifest';
import ANDROID_STRINGS_ATTRIBUTES from './config/android-strings';
import IOS_PLIST_ATTRIBUTES from './config/ios-plist';
import { ConfigParser, ConfigParserInterface } from './ConfigParser';
import {
  FULL_PATH_ANDROID_BUILD,
  FULL_PATH_ANDROID_MANIFEST,
  FULL_PATH_ANDROID_STRINGS,
  FULL_PATH_IOS_INFO,
  IOS_INFO_FILE,
  PACKAGE_JSON,
  RELATIVE_PATH_PROJECT,
} from './constants';
import {
  logInvalidVersionNumber,
  logStartFileProcessing,
  logVersionChange,
} from './helper';
import { Attribute, BuildLines, ToParseInterface } from './types';
import { UpdaterBuildVersion } from './UpdaterBuildVersion';

const getValidationPrompt = async ({
  message,
}: {
  message: string;
}): Promise<boolean> => {
  const { isValid } = await inquirer.prompt([
    {
      name: 'isValid',
      message,
    },
  ]);

  switch (isValid) {
    case 'yes':
      return true;
    case '':
      return true;
    default:
      return false;
  }
};

const getPackageJsonVersion = (path: string) => {
  const fileString = fs.readFileSync(path, 'utf8');
  try {
    return JSON.parse(fileString).version;
  } catch (error) {
    throw new Error(`Version not found in Package.json ${PACKAGE_JSON}`);
  }
};

async function* parseFilesWithValidParser(packageJsonVersion: string) {
  const buildXml = (obj: any) => {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
  };

  const parseXml = async (string: string) => {
    const xmlParser = new xml2js.Parser();
    return await xmlParser.parseStringPromise(string);
  };

  async function parse(toParse: ToParseInterface) {
    const path = relPath + toParse.path;
    logStartFileProcessing(path);

    runConfigParser(
      new ConfigParser(
        path,
        toParse.parseFunc,
        toParse.buildFunc,
        new AttributeManipulation(),
      ),
      toParse.attributes,
    );
  }

  const addVersionAttributesToPlist = () => {
    const versionKeys = ['CFBundleShortVersionString', 'CFBundleVersion'];
    versionKeys.forEach(key => {
      const iosVersionAttribute: Attribute = {
        path: [],
        key,
        value: packageJsonVersion,
        validationFunc: (oldValue, newValue) => {
          if (newValue <= oldValue) {
            logInvalidVersionNumber(oldValue, newValue, IOS_INFO_FILE);
            return false;
          } else {
            logVersionChange(oldValue, newValue, IOS_INFO_FILE);
            return true;
          }
        },
      };
      IOS_PLIST_ATTRIBUTES.push(iosVersionAttribute);
    });
  };

  const getFilesToParse = (): ToParseInterface[] => {
    return [
      {
        path: FULL_PATH_IOS_INFO,
        parseFunc: plist.parse,
        buildFunc: plist.build,
        attributes: IOS_PLIST_ATTRIBUTES,
      },
      {
        path: FULL_PATH_ANDROID_MANIFEST,
        parseFunc: parseXml,
        buildFunc: buildXml,
        attributes: ANDROID_MANIFEST_ATTRIBUTES,
      },
      {
        path: FULL_PATH_ANDROID_STRINGS,
        parseFunc: parseXml,
        buildFunc: buildXml,
        attributes: ANDROID_STRINGS_ATTRIBUTES,
      },
    ];
  };

  addVersionAttributesToPlist();
  const filesToParse = getFilesToParse();

  for (let index = 0; index < filesToParse.length; index++) {
    await parse(filesToParse[index]);
    yield;
  }
}

// NO PARSER CAN READ AND WRITE .gradle files
// correctly into json
const parseGradleFileManually = async () => {
  const path = relPath + FULL_PATH_ANDROID_BUILD;
  logStartFileProcessing(path);

  await runConfigParser(
    new ConfigParser<string, BuildLines>(
      path,
      undefined,
      undefined,
      new AttributeManipulationBuldFile(),
    ),
    ANDROID_BUILD_NEW_LINES,
  );
};

const updateVersionsBuildFile = async (packageJsonVersion: string) => {
  const path = relPath + FULL_PATH_ANDROID_BUILD;
  logStartFileProcessing(path);

  await runConfigParser(
    new ConfigParser<string, string>(
      path,
      undefined,
      undefined,
      new UpdaterBuildVersion(),
    ),
    [packageJsonVersion],
  );
};

async function runPostSyncHook() {
  const packageJsonVersion = getPackageJsonVersion(relPath + PACKAGE_JSON);
  const iterator = parseFilesWithValidParser(packageJsonVersion);

  let iteratorResult: IteratorResult<undefined, void> | undefined;
  while (!iteratorResult?.done || iteratorResult === undefined) {
    iteratorResult = await iterator.next();
  }
  await parseGradleFileManually();
  await updateVersionsBuildFile(packageJsonVersion);
}

const relPath = __dirname.split(RELATIVE_PATH_PROJECT)[0];

const validate = async () => {
  return await getValidationPrompt({
    message: '✔️ RUN POST SYNC HOOK (yes/no) [yes]',
  });
};

const runConfigParser = async <T>(
  configParser: ConfigParserInterface<T>,
  attributes: T[],
) => {
  try {
    await configParser.start(attributes);
  } catch (error) {
    console.log('[Config Parser]: ', error);
    errorFiles.push(configParser.plattformPath);
  }
};

let errorFiles: string[] = [];
const run = async () => {
  const shouldRunValidation = await validate();
  if (shouldRunValidation) {
    await runPostSyncHook();
  }
  if (errorFiles.length > 0) {
    console.log(
      "\n 🚨 WARNING: SOME ERRORS OCCURED. The following files couln't be parsed! Please check the logs above for more information. \n",
      errorFiles.join('\n '),
    );
  }
};

run();
