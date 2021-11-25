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
//'cookieExtractor' extracts JWT token from the request ('req').
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
//2 AUTHORIZATION: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
//Authorization (to protect endpoints) +++ (4c) Logout
console.log(process.env.secretOrKey);
//********
//a)The client requests authorization to the authorization server.
//b)When the authorization is granted, the authorization server
//returns an access token to the application.
//c)The application uses the access token to access a protected resource.
//********

//2.1. SET COOKIE ('JWT token') on a client browser:
//JWTs are credentials, which can grant access to resources. Be careful where you paste them!
//All validation and debugging is done on the client side.
//When 'user' is authenticated (logged in) we SET a COOKIE on
//a client browser and this cookie is the JWT token.
passport.use(
  //jwt strategy with {options object}
  new JwtStrategy(
    //1)first option 'jwt From Request' is the func (3) 'cookieExtractor'
    //2)second option 'secret Or Key' is a secret key to sign to token.
    //'secretOrKey' is used to verify that the JWT (from 'cookieExtractor') is valid.
    {
      //'cookieExtractor' checks&extracts JWT token from the request ('req').
      jwtFromRequest: cookieExtractor,
      //----------------------------
      //matches (4ba) routes->User.js  process.env.secretOrKey,
      //'secretOrKey'verifis that this token is legitimate (valid)
      //JWT token is signed with "process.env.secretOrKey".
      //So we need to verify using the same 'key'.!!!Also the 'key' shouldn't be that simple.
      secretOrKey: process.env.secretOrKey,
    },
    //+ a verified callback:
    //'payload'===data we set whithin JWT token
    // & func 'done'
    (payload, done) => {
      //if user exists: find 'user'
      // _id => search by 'primary key (id)' in DB;
      //JWT has 'claim' called 'subject'('sub')
      //that is a 'primary key'('_id') of 'user'.
      User.findById({ _id: payload.sub }, (err, user) => {
        // if 'error': return 'done' func with Err & 'user' didn't find === false
        if (err) return done(err, false);
        //if 'user' exists: return 'done' with err===null
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
      //if OK & 'user' exists: =>
      //check if password is correct:
      //'user' stands for const { _id, username, role } = req.user;(4b)
      //'comparePassword' comes from models/User.model.js>2.4.
      //'comparePassword' accepts 'password' from the client & 'cb'=> is a 'done' function)
      //'comparePassword' compares 'password' from the client to the 'hashed password'
      user.comparePassword(password, done);
    }); //jwt.io
  })
);
