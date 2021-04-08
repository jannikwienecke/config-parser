import { isNumber, isString } from './helper';
import { AllowedObject, Attribute, Value } from './types';

export class ObjectBuilder {
  private keyPath: string | number;
  constructor(
    public obj: AllowedObject,
    private attribute: Attribute,
    public index = -1,
  ) {
    this.keyPath = this.attribute.path[0];
  }

  build() {
    this.walkThroughPath();
    if (this.attribute.key) {
      this.updateValue(this.attribute.key, this.attribute.value);
    }
  }

  walkThroughPath() {
    this.attribute.path.forEach((keyPath) => {
      this.increaseIndex();

      if (this.keyPathExists()) {
        this.handleExistingKeyPath();
      } else {
        this.handleNonExistingKeyPath();
      }
    });
  }

  updateValue(key: string, value: Value) {
    let updateValue = true;
    const oldValue = this.obj[key];

    if (this.attribute.validationFunc) {
      updateValue = this.attribute.validationFunc(oldValue, value);
    }
    if (updateValue) {
      this.obj[key] = this.attribute.value;
    }
  }

  handleExistingKeyPath() {
    const nextKey = this.getNextKey();
    const lastKeyAndNumber = isNumber(this.keyPath) && !nextKey;

    if (lastKeyAndNumber) {
      this.handleCaseNumberAndLastKeyPath();
    } else {
      this.followPath();
    }
  }

  handleNonExistingKeyPath() {
    this.setNewKey();
  }

  getNextKey() {
    return this.attribute.path[this.index + 1];
  }

  getNextValue() {
    const nextKey = this.getNextKey();
    const isKey = nextKey !== undefined;
    return isString(nextKey) || !isKey ? {} : [];
  }

  keyPathExists() {
    return (
      (isString(this.keyPath) && this.keyPath in this.obj) ||
      (isNumber(this.keyPath) && this.obj[this.keyPath])
    );
  }

  followPath() {
    this.obj = this.obj[this.keyPath];
  }
  increaseIndex() {
    this.index++;
    this.keyPath = this.attribute.path[this.index];
  }

  setNewKey() {
    const nextValue = this.getNextValue();

    this.obj[this.keyPath] = nextValue;
    this.obj = this.obj[this.keyPath];
  }

  handleCaseNumberAndLastKeyPath() {
    let hasObj = false;

    this.obj.forEach((obj: any) => {
      if (JSON.stringify(obj) === JSON.stringify(this.attribute.value)) {
        hasObj = true;
      }
    });

    if (!hasObj) {
      this.obj.push(this.attribute.value);
    }
  }
}
