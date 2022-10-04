const express = require("express");
const router = express.Router();
const Comments = require("../schemas/comment");

//* 댓글 작성

router.post("/comments/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const { user, pw, content } = req.body;

    const createdcomment = await Comments.create({
      postId,
      user,
      pw,
      content,
    });
    res.json({ comments: createdcomment, message: "댓글을 생성했습니다." });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//*댓글 목록 조회
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  //포스트 아이디가 일치한다면 / 그 아이디에 콘텐츠 가져와
  const comment = await Comments.find({ postId }).sort({ createdAt: "desc" }); // 셀렉트 하면 가져오고 싶은거만 가져올 수 있음/ 트루폴스 해줘야함/ {"title": true(1)}
  console.log(comment);

  res.json({ comment: comment });
});

//*댓글 수정
router.put("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { pw, content } = req.body;
  const comment = await Comments.findById(commentId);
  if (content.length === 0 && pw == comment.pw) {
    res.json({ message: "댓글을 입력해주세요" });
  }
  if (pw == comment.pw) {
    await Comments.updateOne({ commentId: commentId }, { $set: { content } });
  }
  res.json({ result: true, message: "댓글수정했습니다" });
});

//* 댓글 삭제
router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  console.log(commentId);
  const { pw } = req.body;
  const comment = await Comments.findOne({ commentId });
  if (pw == comment.pw) {
    await Comments.deleteOne({ commentId });
  } else if (comment.length) {
    res.json({ message: "비번틀린대용?" });
  }
  res.json({ message: "게시글이 삭제됐습니다." });
});

module.exports = router;
