const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      //따로 변수선언해서 뉴데이트해줘야함
      type: Date,
    },
  },
  { timestamps: true }
);

commentsSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Comments", commentsSchema);
