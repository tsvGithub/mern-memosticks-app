//III  <= II.User.model.js / => IV
//'passport' is AUTHENTICATION middleware.
const passport = require("passport");
//Passport strategy for authenticating with a username and password
//LocalStrategy is how we are going to be authenticating against a DB (username & password)
const LocalStorage = require("passport-local");
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
    //to authenticate agianst the DB
    //check if 'user' exist => find username
    //and cb
    User.findOne({ username }, (err, user) => {
      //smthng went wrong with DB
      if (err) {
        return done(err);
      }
      //no 'user' exists
      if (!user) {
        //invoke 'done' function with no err (null) &
        //did not find a user(false)
        return done(null, false);
      }
      //if OK: =>
      //!!!
      //'user' for (4b) const { _id, username, role } = req.user;
      //comparePassword (2b)
      //check compare if password is correct
      //ComparePassword comes from User.js model
      //we pass in ComparePassword func in Model 'password"
      // and cb===done
    });
  })
);
