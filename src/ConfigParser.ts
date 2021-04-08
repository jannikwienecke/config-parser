import {
  AttributeManipulationInterface,
  BuildFunction,
  ParseFunction,
} from './types';

import * as fs from 'fs';
import { logWriteToFile } from './helper';

export class ConfigParser<ObjectToManipulateType, AttributeType> {
  private fileObj: any = {};

  constructor(
    private plattformPath: string,
    private parse: ParseFunction,
    private build: BuildFunction,
    private AttributeManipulation: AttributeManipulationInterface<
      ObjectToManipulateType,
      AttributeType
    >,
  ) {}

  async start(attributes: AttributeType[]) {
    await this.readfile();
    this.fileObj = await this.AttributeManipulation.manipulate(
      this.fileObj,
      attributes,
    );
    await this.writeFile();
  }

  async readfile() {
    const fileString = fs.readFileSync(this.plattformPath, 'utf8');
    this.fileObj = await this.parseStringToFileObj(fileString);
  }

  async writeFile() {
    const string = await this.parseFileObjToFileString(this.fileObj);
    logWriteToFile(this.plattformPath);
    fs.writeFileSync(this.plattformPath, string);
  }

  async parseStringToFileObj(fileString: string) {
    if (this.parse) {
      return await this.parse(fileString);
    } else {
      return fileString;
    }
  }

  async parseFileObjToFileString(fileObj: any) {
    if (this.build) {
      return await this.build(fileObj);
    } else {
      return fileObj;
    }
  }
}
