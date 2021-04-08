import { ANDROID_BUILD } from './constants';
import { logInvalidVersionNumber, logVersionChange } from './helper';
import { AttributeManipulationInterface, ReplaceOptions } from './types';

const PREFIX_VERSION_CODE_BUILD = 'versionCode ';
const PREFIX_VERSION_NAME_BUILD = 'versionName ';

export class UpdaterBuildVersion
  implements AttributeManipulationInterface<string, string> {
  manipulate = (fileString: string, correctVersionArr: string[]) => {
    const getVersionCode = (fileString: string) => {
      return fileString.split(PREFIX_VERSION_CODE_BUILD)[1][0];
    };
    const getVersionName = (fileString: string) => {
      return fileString.split(PREFIX_VERSION_NAME_BUILD)[1].slice(1, 6);
    };

    const validatVersion = (
      correctVersionName: string,
      currentVersionName: string,
    ) => {
      if (correctVersioName <= currentVersionName) {
        logInvalidVersionNumber(
          currentVersionName,
          correctVersioName,
          ANDROID_BUILD,
        );
        return false;
      }
      return true;
    };

    const replaceVersions = () => {
      const replace = ({ oldVersion, newVersion, prefix }: ReplaceOptions) => {
        return fileString.replace(prefix + oldVersion, prefix + newVersion);
      };

      fileString = replace({
        oldVersion: currentVersionCode,
        newVersion: newVersionCode,
        prefix: PREFIX_VERSION_CODE_BUILD,
      });

      fileString = replace({
        oldVersion: `"${currentVersionName}"`,
        newVersion: `"${correctVersioName}"`,
        prefix: PREFIX_VERSION_NAME_BUILD,
      });
    };

    const correctVersioName = correctVersionArr[0];
    const currentVersionName = getVersionName(fileString);

    const currentVersionCode = getVersionCode(fileString);
    const newVersionCode = parseInt(currentVersionCode) + 1;

    if (!validatVersion(correctVersioName, currentVersionName)) {
      return fileString;
    }

    logVersionChange(currentVersionCode, newVersionCode, ANDROID_BUILD);
    logVersionChange(currentVersionName, correctVersioName, ANDROID_BUILD);
    replaceVersions();

    return fileString;
  };
}
