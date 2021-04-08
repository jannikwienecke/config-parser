import { AttributeManipulationInterface, BuildLines } from './types';

export class AttributeManipulationBuldFile
  implements AttributeManipulationInterface<string, BuildLines> {
  manipulate = (fileString: string, attributes: BuildLines[]) => {
    const build = (attribute: BuildLines) => {
      const newLineInFile = fileString.includes(attribute.newLine);
      if (newLineInFile) return;

      const [firstPart, secondPart] = fileString.split(attribute.snippet);

      fileString = `${firstPart} ${attribute.snippet} \n ${attribute.newLine} \n ${secondPart}`;
    };

    const loopAttributes = () => {
      attributes.forEach((attribute) => {
        build(attribute);
      });
    };

    loopAttributes();

    return fileString;
  };
}
