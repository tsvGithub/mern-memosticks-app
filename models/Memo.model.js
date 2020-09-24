const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memoSchema = new Schema(
  {
    memo: { type: String, required: true },
    importance: { type: String, required: true },
    area: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
const Memo = mongoose.model("Memo", memoSchema);
module.exports = Memo;
//or:
// module.exports = mongoose.model("Memo", memoSchema);
