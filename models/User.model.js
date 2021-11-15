const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  video: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
