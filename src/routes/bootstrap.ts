import express from "express";

const Router = express.Router();

import user from './User/route'
Router.use("/user",user );

export default Router;
