const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const video = new Schema({
  // date: { type: Date, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  length: { type: Number },
  type: { type: String },
  timesOfDay: { type: String, required: true },
  //   timestamps: true,
});
// const Memo = mongoose.model("Memo", memoSchema);
// module.exports = Memo;
//or:
module.exports = mongoose.model("Video", video);
