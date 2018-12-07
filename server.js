const mongoose = require("mongoose");
const { User } = require("./User");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const bodyParser = require("body-parser");
const app = express();

// mongo

mongoose.connect(
  "mongodb://localhost:27017/testThing",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));

// routes

app.post("/signup", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  let user = new User(body);
  user.save().then(user => res.json(user));
});

app.listen(5000, console.log("listening on 5000"));
