const express = require("express");
const app = express.Router();
const Video = require("../models/Video.model");

// //CRUD
// //localhost:5000 and then at the end:
app.get("/all", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
    // res.status(200).send("Hello");
    // console.log({ videos });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to get videos",
        msgError: true,
      },
    });
  }
});
//POST
app.post("/", async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
      url: req.body.url,
      length: req.body.length,
      timesOfDay: req.body.timesOfDay,
    });
    await newVideo.save();
    // res.send(newMemo)
    res.status(200).json({
      message: {
        msgBody: "Successfully Added new Video",
        //msgError false since everything went according to plan
        msgError: false,
      },
    });
  } catch {
    res.status(500).json({
      //create Message Object for React Message Component
      message: {
        msgBody: "Unable to add new video",
        msgError: true,
      },
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    console.log({ video });
    res.status(200).json(video);
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to get selected video",
        msgError: true,
      },
    });
  }
});
app.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: {
        msgBody: "Successfully Deleted Video",
        msgError: false,
      },
    });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to Delete Video",
        msgError: true,
      },
    });
  }
});
app.put("/:id", async (req, res) => {
  try {
    await Video.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true });
    res.status(200).json({
      message: {
        msgBody: "Successfully Updated Video",
        msgError: false,
      },
    });
  } catch {
    res.status(500).json({
      message: {
        msgBody: "Unable to Update Video",
        msgError: true,
      },
    });
  }
});

module.exports = app;
