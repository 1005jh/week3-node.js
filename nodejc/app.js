const express = require("express");
const app = express();
const port = 4000;
// app.js
const postsRouter = require("./routes/index.js"); //./상대경로
const commentRouter = require("./routes/index.js");
//웹서버에 mongoDB에 연결
const connect = require("./schemas"); //index.js는 국룰이라 생략함
connect();

app.use(express.json());

app.use("/api", [postsRouter], [commentRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
