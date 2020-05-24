import express from "express";

const Route = express.Router();

import { create } from "../../controllers/User.controller";

Route.post("/register", create);

export default Route