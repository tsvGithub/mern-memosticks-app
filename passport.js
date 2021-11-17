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

//-----------------------
//3
//When 'user' is authenticated (logged in) we set a cookie on
//the client browser and this cookie is the JWT token.
//'cookieExtractor' extracts JWT token from the request ('req').

//a)The client requests authorization to the authorization server.
//b)When the authorization is granted, the authorization server
//returns an access token to the application.
//c)The application uses the access token to access a protected resource.
const cookieExtractor = (req) => {
  // extracted token:
  let token = null;
  //if there is req object & req.cookies not empty
  if (req && req.cookies) {
    //set extracted token to jwt access token from authorization server
    token = req.cookies["access_token"];
  }
  //return 'null' or 'access token'
  return token;
};

//----------------------
//2
//AUTHORIZATION (to protect endpoints) +++ (4c) Logout
console.log(process.env.secretOrKey);

passport.use(
  //jwt strategy with options object
  new JwtStrategy(
    //1)first option 'jwtFromRequest' is the func (3) 'cookieExtractor'
    //2)second option 'secretOrKey' is a secret key that we use to sign to token.
    //'secretOrKey' is used to verify that the JWT token (from 'cookieExtractor') is valid.

    //So we signed our JWT token with "process.env.secretOrKey".
    //So we need to verify using the same 'key'.
    //!!!Also the 'key' shouldn't be that simple.
    {
      jwtFromRequest: cookieExtractor,
      //----------------------------
      //matches (4ba) routes->User.js  process.env.secretOrKey,
      //passport uses 'secretOrKey' to verify hat this token is legitimate (valid)
      secretOrKey: process.env.secretOrKey,
    },
    //a verified callback:
    //'payload' === data we set whithin JWT token
    // & func 'done'
    (payload, done) => {
      //if user exists: find 'user'
      // _id => search by 'primary key' in DB;
      //JWT has 'claim' called 'subject'('sub')
      //that is a 'primary key'('_id') of 'user'.
      User.findById({ _id: payload.sub }, (err, user) => {
        // if error: return 'done' func with Err & 'user' didn't find === false
        if (err) return done(err, false);
        //if user exists: return 'done' with err===null
        //and 'user' object. Because 'user' is already authenticated (logged in)
        //we don't need to check password to comapre
        if (user) return done(null, user);
        //if not user (that has a primary key===_id)
        //return func done with err===null, user===false
        else return done(null, false);
      });
    }
  )
);

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
