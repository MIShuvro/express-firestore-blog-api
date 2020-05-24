import * as admin from "firebase-admin";

import * as fireorm from "fireorm";

import express from "express";
require("dotenv");
const serviceAccount = require("../firestore.json");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-firestore-blog-6ea50.firebaseio.com",
});

const firestore = admin.firestore();
fireorm.initialize(firestore);

/***
 * --------------------------------------------------
 *  Calling Routes
 * --------------------------------------------------
 */

import route from "./routes/bootstrap";

app.use(route);

app.listen(PORT, () => {
  console.log(`<< Server is Running at port ${PORT} >>`);
});
