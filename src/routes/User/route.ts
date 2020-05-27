import express from "express";

const Route = express.Router();

import { create, login } from "../../controllers/User.controller";

Route.post("/register", create);
Route.post("/login", login);

export default Route;
