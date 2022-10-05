const express = require("express");
const router = express.Router();

//*게시글 작성
const Posts = require("../schemas/post");
router.post("/posts", async (req, res) => {
  const { user, pw, title, content } = req.body;
  const createdAt = new Date();

  const createdPosts = await Posts.create({
    user,
    pw,
    title,
    content,
    createdAt,
  });

  res.json({ posts: createdPosts });
});

//*게시글 조회
router.get("/posts", async (req, res, next) => {
  const posts = await Posts.find({})
    .select("user title content createdAt")
    .sort({ createdAt: "desc" });
  res.json({ posts: posts });
});

//*게시글 상세조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId);

  const detail = await Posts.findOne({ _id: postId });
  console.log(detail);
  res.json({ detail: detail });
});

//*게시글 수정
router.put("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const { pw, content, title } = req.body;
  const post = await Posts.findOne({ _id: postId });
  console.log(post);
  if (pw !== post.pw) {
    res.status(400).json({ errorMessage: "비밀번호가 틀렸습니다." });
    return;
  }
  if (post.length) {
    await Posts.updateOne({ _id: postId }, { $set: { content, title } });
  }
  res.json({ result: true, message: "게시글을 수정했습니다." });
});

//*게시글 삭제
router.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const { pw } = req.body;
  const post = await Posts.findOne({ _id: postId });
  if (pw !== post.pw) {
    res.status(400).json({ errorMessage: "비밀번호가 틀렸습니다." });
    return;
  }
  if (pw === post.pw) {
    await Posts.deleteOne({ postId });
  }
  res.json({ result: "success", message: "게시글이 삭제됐습니다." });
});

module.exports = router;
