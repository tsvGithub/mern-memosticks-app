const mongoose = require("mongoose");
//2)
//to hash a password (encrypt it) to protect password in DB from hackers
const bcrypt = require("bcrypt");

// II <=I.server.js / III => passport.js
//1) Model Schema
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    //role => user or admin
    enum: ["user", "admin"],
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

//NB! Below used 'old fashion function' because of 'this'
//'arrow func' will give an error!!!

//===================================================
//3) Hashing (encrypting) password
//=====================================================
//bcrypt
//mongoose pre-hook => code executes right before 'save'
//to hash the password before save it into DB
User.pre("save", function (next) {
  //When "save" function is called, we will first check to see if the user is being 'created' or 'changed'.
  //If the user is not being created or changed, we will skip over the hashing part.
  //We don’t want to hash our already hashed data.
  //does password need to hash?
  //-------------
  //if password already hashed:
  if (!this.isModified("password")) {
    //if 'password' isn't modified (!this.isModified === not modified)
    // true => call func 'next'
    return next();
  }
  //------------------------------------
  //if a password didn't hash:
  // hashing password: 1) password 2) saltround
  //3)callback with err & get back the hashed password
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    //if error:
    if (err) {
      return next(err);
    }
    //if OK =>
    //overwrite existing password and set it
    //to password hash
    this.password = passwordHash;
    //then call next
    next();
  });
});

//4)
//COMPARE PASSWORD
//+++passport.js LocalStrategy (3a)
//compare plain text from client
//to hashed password within DB
//1)passwod in plain text, 2)call-back==='done'in psssport.js (1) 'user.comparePassword(password, done);'
User.methods.comparePassword = function (password, cb) {
  //1)"password" from the client when user trying to sign in;
  //2)'this.password' hashed password
  //3)cb with error & isMatch(true/false)
  //callback function returns the true/false result of whether or not the two matched.
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      //return cb with the error
      return cb(err);
    } else {
      //if 'password' isn't match (if isMatch === false)
      if (!isMatch) {
        console.log("Password doesn't match");
        //return cb with null for error object &
        //isMatch === false
        console.log(isMatch);
        return cb(null, isMatch);
      }
      //if 'password' matches (isMatch === true)
      console.log("Password matches");
      //return cb with null for error object &
      //'this'==={user object} for (4b) req.user
      console.log(this);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", User);
