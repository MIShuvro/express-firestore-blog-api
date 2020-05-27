import {
  validate,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

import { UserModel, User } from "../models/User";

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    let isUserName = await UserModel.whereEqualTo("username", value).findOne();
    let isEmail = await UserModel.whereEqualTo("email", value).findOne();
    if (isUserName || isEmail) {
      return false;
    } else {
      return true;
    }
    
  }
}

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
