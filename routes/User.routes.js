//IV <= III. passport.js / => V.FE
const express = require("express");
const user = express.Router();
//use 'passport' configuration from III. passport.js
const passport = require("passport");
const passportConfig = require("../passport");

//sign jwt token/ create JWT token
const JWT = require("jsonwebtoken");

const User = require("../models/User.model");
const Video = require("../models/Video.model");

//1) SIGN UP
//route localhost:5000/user/register
user.post("/register", (req, res) => {
  //pull out "username", "password", "role" from request body
  const { username, password, role } = req.body;
  //create a new User
  //check if User already exists. If not, create a new User object:
  User.findOne({ username }, (err, user) => {
    if (err) res.status(500).json({ message: { msgBody: `DB Error ${err} !`, msgError: true } });
    //if user already exists
    if (user) {
      res
        .status(400)
        .json({ message: { msgBody: "Username already exist, do you want Login instead?", msgError: true } });
    } else {
      //if no user with that name:
      //create new User with username, password and role
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err) {
          res.status(500).json({ message: { msgBody: `DB Error ${err}!`, msgError: true } });
        } else {
          res.status(201).json({ message: { msgBody: "Thank you! Account created", msgError: false } });
        }
      });
    }
  });
});

module.exports = user;
