import { ObjectBuilder } from './ObjectBuilder';
import {
  AttributeManipulationInterface,
  AllowedObject,
  Attribute,
} from './types';

export class AttributeManipulation
  implements AttributeManipulationInterface<AllowedObject, Attribute> {
  manipulate = (objToManipulate: AllowedObject, attributes: Attribute[]) => {
    const build = (attribute: Attribute) => {
      const objBuilder = new ObjectBuilder(objToManipulate, attribute);
      objBuilder.build();
    };

    const loopAttributes = () => {
      attributes.forEach(attribute => {
        build(attribute);
      });
    };

    loopAttributes();

    return objToManipulate;
  };
}
