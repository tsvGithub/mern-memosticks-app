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

// console.log(process.env.secretOrKey);
//---------------------------
//4.2.1 SIGNIN TOKEN
//'userId'===DB primary key _id
const signToken = (userId) => {
  //jwt.sign(payload, secretOrKye, [options:'expires', callback])
  //jwt.sign returns the actual JWT token
  return JWT.sign(
    //payload: send back all you want except sensitive data:
    //no credit card info, no social securities etc.!
    {
      //'iss'===issuer => who issued (vypustil) this jwt token?
      //The "iss" value is a case-sensitive string containing a StringOrURI
      //value.  Use of this claim is OPTIONAL
      iss: "tsv",
      //'sub'===subject => who is this JWT token for?
      //для кого предназначен этот токен JWT?
      //The "sub" value is a case-sensitive string containing a StringOrURI
      //value.  Use of this claim is OPTIONAL.
      //'userId'=== primary key _id of the 'user' in DB
      //'userId' is incomming parameter of the function 'signToken'
      sub: userId,
    },
    //Second arg is the key that you want to sign with.
    //Make sure it matches the 'secretOrKey' in
    //passport.js(3.2)'secretOrKey:process.env.secretOrKey,'
    //passport will be use this 'secretOrKey' to verify
    //that this token is legitimate (valid, matches)
    process.env.secretOrKey,
    //option: expires in (1day, 1hour,(or in milisec) 5000)
    { expiresIn: "1h" }
  );
};

//4.1) SIGN UP
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

//===================================================
//4.2) LOGIN
//+ passport.js(1)'local startegy'
//'/login' route with passport middleware:
user.post(
  "/login",
  //strategy to authenticate===passport.authenticate("local") authenticates agianst the DB
  //see 'local strategy' passport.js (1) ===>
  //passport.use(new LocalStrategy(username, password, done) => User.findOne({username}) => user.comparePassword(password, done))
  passport.authenticate(
    "local",
    //second -> {set the 'session' to false} so the server is not maintaining the session
    { session: false }
  ),
  (req, res) => {
    //if user is authenticated:
    //isAuthenticated() is added by Passport by default
    //passport is attaching 'user' object to the req.object by itself.
    //isAuthenticated() returns boolean (true/false)
    if (req.isAuthenticated()) {
      //pull out the 'primary key _id', 'username', 'role'
      //from 'req.user' (3.1) passport.js
      //passport.use(new LocalStrategy)=>user.comparePassword(password, done)
      // and from /models/User.js (2.4) COMPARE PASSWORD:
      //->returns cb with null for error&this==='user' object for 'req.user'
      // return cb(null, this);<-
      const { _id, username, role } = req.user;
      //------------------------
      //if user is signed in => we can create JWT token:
      //func 'signToken' with primary key (_id) (4.2.1. above)
      const token = signToken(_id);
      //---------------------------------
      //set the cookie as the 'access token' (passport.js 3.3)
      res.cookie(
        "access_token",
        //pass in JWT token
        token,
        //pass next options:
        //SECURITY: make sure that JWT token doesn't get stolen
        //'httpOnly'=> makes that on the client side
        //(client browser) you cannot touch this cookie
        //using JS and prevents against cross-site
        //scripting attacks;
        //'sameSite' property is to protect against cross-site
        //forgery attacks===poddelka, podlog,falj6ivka
        { httpOnly: true, sameSite: true }
      );
      //sending back response:
      res.status(200).json(
        //isAuthenticated: true because the user is successfully logged in
        {
          isAuthenticated: true,
          //send back 'user' with 'username' and 'role'
          user: { username, role },
        }
      );
    } else {
      const { username } = req.user;
      User.findOne({ username }, (err, user) => {
        if (err) {
          res.status(500).json({ message: { msgBody: `DB Error ${err}`, msgError: true } });
        }
        if (!user) {
          res
            .status(400)
            .json({ message: { msgBody: "Username does't exist, do you want Sign Up instead?", msgError: true } });
        }
      });
    }
  }
);

module.exports = user;
