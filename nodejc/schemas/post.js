//상품 모델 작성
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

postSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Posts", postSchema);
