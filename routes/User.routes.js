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
//4.2.1 create a SIGNIN TOKEN
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
      // console.log(message.msgBody);
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
  //strategy to authenticate===passport.authenticate("local")(instead of "jwt" for LOGOUT) authenticates agianst the DB
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
      //a)set the cookie:
      res.cookie(
        // 'access token' (passport.js 3.3)
        "access_token",
        //created JWT token (4.2.1.)
        token,
        //options:
        //SECURITY: make sure that JWT token doesn't get stolen
        //'httpOnly'=> makes that on the client side
        //(client browser) you cannot touch this cookie
        //using JS and prevents against cross-site
        //scripting attacks;
        //'sameSite' property is to protect against cross-site
        //forgery attacks===poddelka, podlog,falj6ivka
        { httpOnly: true, sameSite: true }
      );
      //b)sending back response:
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

//===========================================
//4.3) LOGOUT
//'/logout' route with 'passport' middleware:
//strategy to authorizate===(instead of "local" for LOGIN) is 'jwt'(to protect endpoints)
//see JwT strategy in passport.js 3.2. ->
//passport.use(new JwtStrategy()),
//second -> {set the session to false} so the server is not maintaining the session
user.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  //clear the cookie (access token) => delete JWT access token
  //need to sign again if need access to site
  // 'access token' (passport.js 3.3)
  res.clearCookie("access_token");
  //send response back: return empty 'user' object
  //'success' if successfully logout
  res.json({ user: { username: "", role: "" }, success: true });
});

//================================
//===============================
//4.4) add VIDEOS
//'/video' route with passport middleware:
//strategy to authorizate===(instead of "local" for LOGIN) is 'jwt'(to protect endpoints)
//see JwT strategy in passport.js 3.2. ->
//passport.use(new JwtStrategy()),
//second -> {set the session to false} so the server is not maintaining the session

//'User' has to be logged in (JWT token) in order to add a new video
user.post("/video", passport.authenticate("jwt", { session: false }), (req, res) => {
  //create a new 'video'=> 'req.body' comes from the client
  const video = new Video(req.body);
  //save new video to the DB
  video.save((err) => {
    if (err) {
      res.status(500).json({ message: { msgBody: `DB Error ${err}`, msgError: true } });
    } else {
      //'req.user' is added by passport=> attaches 'user' to the request object;
      //'user' is from DB => in Model->User.js (2) 'user' has [] of 'videos'
      //'push' is adding 'video' to the 'videos' array within 'user'
      req.user.videos.push(video);
      //save updated 'user' to the DB
      req.user.save((err) => {
        if (err) {
          res.status(500).json({ message: { msgBody: `DB Error ${err} `, msgError: true } });
        } else {
          res.status(200).json({ message: { msgBody: "Video creted!", msgError: false } });
        }
      });
    }
  });
});
//=============================
//4.5) GET all user's VIDEOS
//'/videos' route with passport middleware:
//strategy to authorizate===(instead of "local" for LOGIN) is 'jwt'(to protect endpoints)
//see JwT strategy in passport.js 3.2. ->
//passport.use(new JwtStrategy()),
//second -> {set the session to false} so the server is not maintaining the session

//user has to be logged in (JWT token) in order to get 'videos'
user.get("/videos", passport.authenticate("jwt", { session: false }), (req, res) => {
  //'req.user' is added by passport=> attaches 'user' to the request object;
  //'user' is from DB => in Model->User.js (2) 'user' has [] of 'videos'
  //'_id'===primary key
  User.findById({ _id: req.user._id })
    //when we find the 'user', the 'videos' array only
    //has primary keys of 'videos' within it. We need to
    //populate it with actual data of 'videos' to get back 'videos':
    .populate("videos")
    //execute 'populate'
    //'document'===record in MongoDB collection
    .exec((err, document) => {
      if (err) {
        res.status(500).json({ message: { msgBody: `DB Error ${err} `, msgError: true } });
      } else {
        //send back 'videos' => document.videos & send back
        //set authenticated (for frontend) to true to let to know that user is still logged in
        res.status(200).json({ videos: document.videos, authenticated: true });
      }
    });
});
//=============================
//=============================
//4.6) ADMIN ROUTE
//passport.authenticate("jwt") sends unauthorized request
//if user don't have JWT token
user.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
  //check if user has right permissions === admin
  if (req.user.role === "admin") {
    res.status(200).json({ message: { msgBody: "Hello, admin!", msgError: false } });
  } else {
    //403===not authorized not an admin => it is a user
    res.status(403).json({ message: { msgBody: "Not authorized!", msgError: true } });
  }
});
//=============================
//4.7) keep 'user' logged in & sync with FE
//if 'user' logged in, save in the state (React) that 'user' is logged in
//if 'user' closes browser, the state gets reset

//this endpoint makes sure that BE & FE is synced in.
//to keep user still logged in if he was authenticated
user.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  //pull out 'username' & 'role' from req.user
  const { username, role } = req.user;
  //sends back 'user' is authenticated & user information
  res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

module.exports = user;
