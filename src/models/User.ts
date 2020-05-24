import { Collection, getRepository } from "fireorm";

import { IsEmail, MinLength } from "class-validator";

import { Unique } from "../utils/uniqueValidationCheck";

@Collection()
class User {
  id: string;

  @MinLength(4, {
    message: "User name atleast 4 character long",
  })
  @Unique({
    message: "This User name is already in use",
  })
  username: string;

  @IsEmail()
  @Unique({
    message: "This Email is already in use",
  })
  email: string;

  @MinLength(5, {
    message: "Password Atleast 5 character long",
  })
  password: string;
}

const UserModel = getRepository(User);

export { User, UserModel };
