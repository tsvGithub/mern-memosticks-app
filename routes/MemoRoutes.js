const express = require("express");
const memoRouter = express.Router();
//const memoRouter = require('express').Router();
const Memo = require("../models/Memo.model");

//CRUD
//localhost:5000/memos and then at the end:
//READ: => '/'
memoRouter.get("/", async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200).json({ memos });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to get memosticks",
        msgError: true,
      },
    });
  }
});
//// memoRouter.route("/").get((req, res) => {
// memoRouter.get("/", (req, res) => {
//   Memo.find()
//     .then((memos) => res.status(200).json({ memos }))
//     // .catch((err) => res.status(400).json(`Error ${err}`));
//     .catch((err) =>
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to get memosticks",
//           msgError: true,
//         },
//       })
//     );
// });

module.exports = memoRouter;
