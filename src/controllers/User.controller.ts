import { User, UserModel } from "../models/User";
import { validate, validateOrReject } from "class-validator";
import formatError from "../utils/formatError";
const bcrypt = require("bcryptjs");
import { Session, SessionModel } from "../models/Session";
import jwt from "jsonwebtoken";
import { DOMAINS } from "../utils/ENUM";

const create = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const user = new User();

  user.username = username;
  user.email = email;
  user.password = bcrypt.hashSync(password);

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
};

const login = async (req: any, res: any) => {
  let { email, password } = req.body;

  let user = await UserModel.whereEqualTo("email", email).findOne();

  if (!user) {
    return res.status(403).json({
      msg: "invalid Credintails.",
    });
  }

  let fetchPassword = bcrypt.compareSync(password, user.password);
  if (!fetchPassword) {
    return res.status(403).json({
      msg: "invalid Credintails.",
    });
  }

  if (user && fetchPassword) {
    let token = await jwt.sign({ id: user.id }, process.env.SECRET);
    let session = new Session();
    session.sub = user.id;
    session.domain = DOMAINS.USER;
    session.token = token;

    await SessionModel.create(session);

    res.json({
      msg: "Successfully Login...✔",
      token,
    });
  }
};

export { create, login };
