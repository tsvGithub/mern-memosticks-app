const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
//========== MIDDLEWARE ================
app.use(cors());
app.use(express.json());

//============= ROUTES ===================
const videos = require("./routes");
//if root url starts with / it's going to load everithing in videos
app.use("/", videos);

//========== EVIROMENT VARIABLES ========
require("dotenv").config();
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
    console.log("DB Atlas is connected");
  })
  .catch((err) => {
    console.log("Can't connect to the Atlas DB", err.message);
  });
//=======================================================
//Routes

//========================================================
//Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
