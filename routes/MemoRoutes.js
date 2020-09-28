const express = require("express");
const memoRouter = express.Router();
//const memoRouter = require('express').Router();
const Memo = require("../models/Memo.model");

//CRUD
//localhost:5000/memos and then at the end:
//READ: => '/'
//Async
memoRouter.get("/", async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200).json({ memos });
    // console.log({ memos });
    // res.status(200).send("Hello");
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to get memosticks",
        msgError: true,
      },
    });
  }
});
//---------------------------
//Promise
// memoRouter.route("/").get((req, res) => {
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
//=============================
//=============================
//CREATE
//recieve the data (req.body) from the client side
//in request body (req.body)
//--------------------
//If-else
// memoRouter.post("/", (req, res) => {
//   //'memo' is a new instance
//   //of the Memo Model filling with data (req.body) that
//   //has been recieved from the client
//   const memo = new Memo(req.body);
//   //document will be saved to the DB
//   memo.save((err, document) => {
//     if (err)
//       //500 - something went wrong
//       res.status(500).json({
//         //create Message Object for React Message Component
//         message: {
//           msgBody: "Unable to add memo",
//           msgError: true,
//         },
//       });
//     else
//       res.status(200).json({
//         message: {
//           msgBody: "Successfully added memo",
//           //msgError false since everything went according to plan
//           msgError: false,
//         },
//       });
//     console.log(document);//new memo
//     console.log(req.body.memo);
//     console.log(req.body.importance);
//     console.log(req.body.area);
//     console.log(req.body.date);
//   });
// });
//-----------------------
//Promise
// memoRouter.post("/", (req, res) => {
//   // console.log(req.body.memo);
//   // console.log(req.body.importance);
//   // console.log(req.body.area);
//   // console.log(req.body.date);
//   const memo = new Memo({
//     memo: req.body.memo,
//     importance: req.body.importance,
//     area: req.body.area,
//     date: Date.parse(req.body.date),
//   });
//   memo
//     .save()
//     .then((result) => {
//       // console.log(result);
//       res.status(200).json({ msg: "succesfully submitted" });
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(500).json({ msg: "Error occured" });
//     });
// });
// //-------------------------
//Promise
// // memoRouter.route('/').post((req, res) => {
// memoRouter.post("/", (req, res) => {
//   const memo = req.body.memo;
//   const importance = req.body.importance;
//   const area = req.body.area;
//   const date = Date.parse(req.body.date);

//   const newMemo = new Memo({
//     memo,
//     importance,
//     area,
//     date,
//   });

//   newMemo
//     .save()
//     // .then(() => res.json('Memo added!'))
//     .then(() =>
//       res.status(200).json({
//         message: {
//           msgBody: "Successfully Added Memo",
//           //msgError false since everything went according to plan
//           msgError: false,
//         },
//       })
//     )
//     // .catch(err => res.status(400).json(`Error: ${err}`));
//     .catch((err) =>
//       res.status(400).json({
//         //create Message Object for React Message Component
//         message: {
//           msgBody: "Unable to add new memo",
//           msgError: true,
//         },
//       })
//     );
// });
//----------------------------
//Async
memoRouter.post("/", async (req, res) => {
  try {
    const newMemo = new Memo({
      memo: req.body.memo,
      importance: req.body.importance,
      area: req.body.area,
      date: Date.parse(req.body.date),
    });
    await newMemo.save();
    // res.send(newMemo)
    res.status(200).json({
      message: {
        msgBody: "Successfully Added new Memo",
        //msgError false since everything went according to plan
        msgError: false,
      },
    });
  } catch {
    res.status(400).json({
      //create Message Object for React Message Component
      message: {
        msgBody: "Unable to add new memo",
        msgError: true,
      },
    });
  }
});

module.exports = memoRouter;
