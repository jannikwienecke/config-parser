import { Value } from './types';

export const isString = (val: Value) => {
  return typeof val === 'string';
};
export const isNumber = (val: Value) => {
  return typeof val === 'number';
};

export const logInvalidVersionNumber = (
  oldVersion: Value,
  newVersion: Value,
  path: string,
) => {
  console.log(
    `❗️ Version Invalid: ${newVersion} is not higher than ${oldVersion}`,
  );
  console.log(
    '❗️ New Version must be higher than old version: Not updating Versions in ',
    path,
  );
};

export const logVersionChange = (
  oldVersion: Value,
  newVersion: Value,
  path: string,
) => {
  console.log(
    `✅ [${path}]: Changing Version:'${oldVersion} >> ${newVersion}'`,
  );
};

export const logStartFileProcessing = (path: string) => {
  console.log('');
  console.log(`👣 [${path}]:Starting File Processing`);
};

export const logWriteToFile = (path: string) => {
  console.log(`📁 [${path}]:Writing to File...`);
  console.log('');
};
