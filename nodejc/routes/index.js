// routes/goods.js
const express = require("express");
const router = express.Router();
const commentsRouter = require("./comments.js");
const postsRouter = require("./posts.js");

// router.use("/comments", commentsRouter);
router.use("/", postsRouter);
router.use("/", commentsRouter);

// routes/goods.js
module.exports = router;
