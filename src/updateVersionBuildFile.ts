// const replace = require("replace-in-file");
// const fs = require("fs");
// const inquirer = require("inquirer");

import { replaceInFile } from 'replace-in-file';
import * as fs from 'fs';

type From = string | RegExp;

interface FileChange {
  filePath: string;
  fromString: From | From[];
  toString: string | string[];
}

const ANDROID_BUILD = 'build.gradle';
const PATH_BUILD = 'android/app/';
const FULL_PATH_ANDROID_BUILD = PATH_BUILD + ANDROID_BUILD;

const RELATIVE_PATH_PROJECT = 'scripts/config-parser';
const relPath = __dirname.split(RELATIVE_PATH_PROJECT)[0];

const PACKAGE_JSON = 'package.json';

const replaceVersionsInFile = async (options: FileChange) => {
  try {
    const results = await replaceInFile({
      files: options.filePath,
      from: options.fromString,
      to: options.toString,
    });
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const updateVersions = async () => {
  const fileString = fs.readFileSync(PACKAGE_JSON, 'utf8');
  const fileObj = JSON.parse(fileString);
  const correctVersionNumber = fileObj.version;

  const fileStringBuildFile = fs.readFileSync(
    relPath + FULL_PATH_ANDROID_BUILD,
    'utf8',
  );

  const currentVersionName = fileStringBuildFile
    .split('versionName ')[1]
    .slice(1, 6);
  if (correctVersionNumber === currentVersionName) {
    console.log('VERSIONS ARE THE SAME');
    return;
  }

  const currentVersionCode = fileStringBuildFile.split('versionCode ')[1][0];
  const nextVersionCode = parseInt(currentVersionCode) + 1;

  console.log(
    `Changing Version Code: '${currentVersionCode} >> ${nextVersionCode}'`,
  );
  console.log(
    `Changing Version Name: '${currentVersionName} >> ${correctVersionNumber}'`,
  );

  const fileToChange: FileChange = {
    filePath: relPath + FULL_PATH_ANDROID_BUILD,
    fromString: [
      new RegExp(/versionCode [0-9]/, 'i'),
      new RegExp(/versionName "[0-9].[0-9].[0-9]"/, 'i'),
    ],
    toString: [
      `versionCode ${nextVersionCode}`,
      `versionName "${correctVersionNumber}"`,
    ],
  };

  await replaceVersionsInFile(fileToChange);

  console.log('FILE CHANGED>>>');
};

export { updateVersions };
