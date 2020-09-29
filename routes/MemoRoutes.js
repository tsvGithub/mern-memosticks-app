const express = require("express");
const memoRouter = express.Router();
//const memoRouter = require('express').Router();
const Memo = require("../models/Memo.model");

// //CRUD
// //localhost:5000 and then at the end:
// //READ: => '/'
// //Async
memoRouter.get("/", async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200).json({ memos });
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
// //---------------------------
// //Promise
// // memoRouter.route("/").get((req, res) => {
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
// //--------------------------
// //If-else
// memoRouter.get("/", (req, res) => {
//   Memo.find({}, (err, memos) => {
//     if (err) {
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to get memostiks!",
//           msgError: true,
//         },
//       });
//     } else {
//       res.status(200).json({ memos });
//     }
//   });
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
// //-----------------------
// //Promise
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
// // //-------------------------
// //Promise
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
    res.status(500).json({
      //create Message Object for React Message Component
      message: {
        msgBody: "Unable to add new memo",
        msgError: true,
      },
    });
  }
});
//================================
//================================
//SELECT One
//Promise
// memoRouter.get("/:id", (req, res) => {
//   Memo.findById(req.params.id)
//     .then((memo) => res.status(200).json(memo))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });
//----------------------
//Async
memoRouter.get("/:id", async (req, res) => {
  try {
    const memo = await Memo.findById(req.params.id);
    // console.log(memo);
    res.status(200).json(memo);
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to get selected memo",
        msgError: true,
      },
    });
  }
});
//--------------------
//if-else
// memoRouter.get("/:id", (req, res) => {
//   Memo.findById(req.params.id, (err, memo) => {
//     if (err)
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to get selected memo",
//           msgError: true,
//         },
//       });
//     else {
//       res.status(200).json({ memo });
//       console.log(memo);
//     }
//   });
// });
//===================================
//=====================================
//DELETE
//Promise
// // memoRouter.route("/:id").delete((req, res) => {
// memoRouter.delete("/:id", (req, res) => {
//   Memo.findByIdAndDelete(req.params.id)
//     // .then(() => res.status(200).json("Memo deleted."))
//     .then(() =>
//       res.status(200).json({
//         message: {
//           msgBody: "Successfully Deleted Memo",
//           msgError: false,
//         },
//       })
//     )
//     // .catch((err) => res.status(500).json(`Error: ${err}`));
//     .catch((err) =>
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to Delete Memo",
//           msgError: true,
//         },
//       })
//     );
// });
// //-------------------------------
// // if-else
// memoRouter.delete("/:id", (req, res) => {
//   Memo.findByIdAndDelete(req.params.id, (err) => {
//     if (err)
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to Delete Memo",
//           msgError: true,
//         },
//       });
//     else
//       res.status(200).json({
//         message: {
//           msgBody: "Successfully Deleted Memo",
//           msgError: false,
//         },
//       });
//   });
// });
// //------------------------
// //Async
memoRouter.delete("/:id", async (req, res) => {
  try {
    await Memo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: {
        msgBody: "Successfully Deleted Memo",
        msgError: false,
      },
    });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to Delete Memo",
        msgError: true,
      },
    });
  }
});

//===================================
//=====================================
//Update
//recieve the data from the client side
//if-else
// memoRouter.put("/:id", (req, res) => {
// //Memo === Memo Model
// //{ _id: req.params.id } => which item to update
// //req.body => document to update from the user
// //{ runValidators: true } => mongose by default runs validators for all requests, except UPDATE, so need to be set to TRUE
//   Memo.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
//     if (err)
//       //500 - something went wrong
//       res.status(500).json({
//         //create Message Object
//         //for react Message Component
//         message: {
//           msgBody: "Unable to Update Memo",
//           msgError: true,
//         },
//       });
//     else
//       res.status(200).json({
//         message: {
//           msgBody: "Successfully Updated Memo",
//           //msgError false since everything went according to plan
//           msgError: false,
//         },
//       });
//   });
// });
// //------------------------
// //Promise
// memoRouter.put("/:id", (req, res) => {
// //   //Memo === Memo Model
// //   //{ _id: req.params.id } => which item to update
// //   //req.body => document to update from the user
// //   //{ runValidators: true } => mongose by default runs validators for all requests, except UPDATE, so need to be set to TRUE
//   Memo.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })
//     .then(() =>
//       res.status(200).json({
//         message: {
//           msgBody: "successfully Updated Memo!",
//           msgError: false,
//         },
//       })
//     )
//     .catch((err) =>
//       res.status(500).json({
//         message: {
//           msgBody: "Unable to Update Memo",
//           msgError: true,
//         },
//       })
//     );
// });
//---------------------
//Async
memoRouter.put("/:id", async (req, res) => {
  try {
    await Memo.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true });
    res.status(200).json({
      message: {
        msgBody: "Successfully Updated Memo",
        msgError: false,
      },
    });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to Update Memo",
        msgError: true,
      },
    });
  }
});

module.exports = memoRouter;
