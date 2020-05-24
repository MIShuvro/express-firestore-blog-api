import { User, UserModel } from "../models/User";
import { validate, validateOrReject } from "class-validator";
import formatError from "../utils/formatError";

const create = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const user = new User();

  user.username = username;
  user.email = email;
  user.password = password;

  validate(user).then(async (errors) => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      let errobj = formatError(errors);
      res.send(errobj);
    } else {
      const newUser = await UserModel.create(user);
      res.json({
        message: "User Create Successfully",
        data: newUser,
      });
    }
  });

  // validateOrReject(user).catch((errors) => {
  //   console.log("Promise rejected (validation failed). Errors: ", errors);
  // });
};

export { create };
