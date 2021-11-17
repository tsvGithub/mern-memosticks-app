//III  <= II.User.model.js / => IV
//'passport' is AUTHENTICATION middleware.
const passport = require("passport");
//Passport strategy for authenticating with a username and password
//LocalStrategy is how we are going to be authenticating against a DB (username & password)
const LocalStrategy = require("passport-local").Strategy;
//User model : username & password
const User = require("./models/User.model");
//-----------------------------
// jwt.io
//A Passport strategy for AUTHORIZATION with a JSON Web Token.
const JwtStrategy = require("passport-jwt").Strategy;

//---------------------
//LOGIN => AUTHENTICATION
//1) USE PASSPORT
//***used in  /routes->User.js 'login' (4a)***
//authenticated local strategy using username and password
passport.use(
  //LocalStr. with verified cb: username,password & done
  //'done' will be invoked when we are done
  new LocalStrategy((username, password, done) => {
    //authenticates agianst the DB
    //check if 'user' exist => find username
    //and cb
    User.findOne({ username }, (err, user) => {
      //smthng went wrong with DB
      if (err) {
        return done(err);
      }
      //if no 'user' exists (accout is not exist)
      if (!user) {
        //invoke 'done' function with no err (null) &
        //did not find a user(false)
        return done(null, false);
      }
      //if OK & 'user' exists: => check if password is correct:
      //'user' for (4b) const { _id, username, role } = req.user;

      //'comparePassword' (comes from 2.4> models/User.model.js
      //'comparePassword' accepts password from the client & 'cb'=> is a 'done' function)
      //'comparePassword' compares password from the client to the hashed password
      user.comparePassword(password, done);
    }); //jwt.io
  })
);
