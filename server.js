const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");

//I => II.models/User.model.js

app.use(cors());
app.use(express.json());

//NB! try this:
//Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work.
//https://www.npmjs.com/package/express-session
app.use(cookieParser());

//---------------
//Test User model:
const User = require("./models/User.model");
const userInput = {
  username: "zhurka",
  password: "password",
  role: "admin",
};
const user = new User(userInput);
user.save((err, document) => {
  if (err) {
    console.log(err);
  }
  console.log(document);
});

//============= ROUTES ===================
const videos = require("./routes");
//if root url starts with / it's going to load everithing in videos
app.use("/", videos);

//========== EVIROMENT VARIABLES ========
require("dotenv").config();
// dotenv.config(); //'require' is above

// console.log(process.env.DATABASEURL);
// console.log(process.env.Atlas_URI);

//============= MongoDB Atlas ===================
mongoose
  .connect(process.env.Atlas_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((err) => {
    console.log("Can't connect to the MongoDB Atlas", err.message);
  });

//========================================================
//Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
