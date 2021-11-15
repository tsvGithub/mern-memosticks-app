const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const video = new Schema(
  // const memoSchema = new Schema(
  {
    // memo: { type: String, required: true },
    // importance: { type: String, required: true },
    // area: { type: String, required: true },
    // date: { type: Date, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    length: { type: Number, required: true },
    timesOfDay: { type: String, required: true },
    // },
    // {
    //   timestamps: true,
  }
);
// const Memo = mongoose.model("Memo", memoSchema);
// module.exports = Memo;
//or:
module.exports = mongoose.model("Video", video);
