const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
//========== MIDDLEWARE ================
app.use(cors());
app.use(express.json());

//============= ROUTES ===================
const memosRouter = require("./routes/MemoRoutes");
// //if root url starts with /memos it's going to load everithing in memosRouter
// app.use("/memos", memosRouter);
app.use("/", memosRouter);

//========== EVIROMENT VARIABLES ========
require("dotenv").config();
// console.log(process.env.DATABASEURL);
// console.log(process.env.Atlas_URI);

//============= DATABASE: Local & Atlas ===================
//MongoDB local:
// mongoose.connect("mongodb://localhost:27017/memosticks", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.on("connected", () => {
//   console.log("Local DB is connected");
// });
// mongoose.connection.on("error", () => {
//   console.log("Can't connect to the local DB");
// });
//OR MongoDB Atlas
mongoose
  .connect(process.env.Atlas_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Atlas is connected");
  })
  .catch((err) => {
    console.log("Can't connect to the Atlas DB", err.message);
  });
//
//for Heroku here will be another code!
//=======================================================
//Routes

//========================================================
//Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
