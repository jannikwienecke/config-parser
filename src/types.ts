export interface ToParseInterface {
  path: string;
  parseFunc: ParseFunction;
  buildFunc: BuildFunction;
  attributes: Attribute[];
}

export type ParseFunction = ((fileString: string) => any) | undefined;
export type BuildFunction = ((fileObj: any) => string) | undefined;

export type Value = string | number | AllowedObject;
export interface Attribute {
  path: (string | number)[];
  key?: string;
  value: Value | Value[];
  validationFunc?: (oldValue: Value, newValue: Value) => boolean;
}

export interface AllowedObject {
  [key: string]: any;
}

export interface AttributeManipulationInterface<
  ObjToManipulateType,
  AttributeType
> {
  manipulate: (
    objToManipulate: ObjToManipulateType,
    attributes: AttributeType[],
  ) => ObjToManipulateType;
}

export interface BuildLines {
  snippet: string;
  newLine: string;
}

export interface ReplaceOptions {
  oldVersion: string | number;
  newVersion: string | number;
  prefix: string;
}
