const express = require("express");
const jwtAuth = require("../controllers/jwtAuth");
const router = express.Router();
const pool = require("../config/database");
const userController = require("../controllers/userController");

// 회원가입 관련 로직
// 보드명 중복 체크
router.post("/join/checkDupBoard", async (req, res) => {
  console.log("checkDupBoard", req.body);
  const { board } = req.body;
  try {
    const isValidBoard = await userController.checkDupBoard(board);
    res.json({ checkDupBoardResult: isValidBoard ? board : true });
  } catch (err) {
    console.log("[CheckDupBoard ERROR] : ", err);
    res.json({ checkDupBoardResult: false });
  }
});

// 이메일 중복 체크
router.post("/join/checkDupEmail", async (req, res) => {
  console.log("checkDupEmail", req.body);
  const { email } = req.body;
  try {
    const isValidEmail = await userController.checkDupEmail(email);
    res.json({ checkDupEmailResult: isValidEmail ? email : true });
  } catch (err) {
    console.log("[CheckDupEmail ERROR] : ", err);
    res.json({ checkDupEmailResult: false });
  }
});

// 회원가입
router.post("/join", async (req, res) => {
  console.log("Join", req.body);
  const { email, pw, name, board, intro } = req.body;
  try {
    await userController.join(email, pw, name, board, intro);
    console.log("Success Join : ", email);
    res.json({ joinResult: true })
  } catch (err) {
    console.log("Fail Join : ", err);
    res.json({ joinResult: false })
  }
})

// 로그인
router.post("/login", async (req, res) => {
  console.log("login", req.body);
  const { email, pw } = req.body;
  try {
    const isValidLogin = await userController.login(email, pw);
    const payload = { user_email: email }
    const accessToken = jwtAuth.signToken(payload, '1h');
    res.json({ loginResult: isValidLogin ? accessToken : true })
  } catch (err) {
    console.log("[LOGIN ERROR] : ", err);
    res.json({ loginResult: false });
  }
});

// 탈퇴
router.post("/delete", jwtAuth.verifyToken, async (req, res) => {
  console.log("delete");
  const { pw } = req.body;
  try {
    const isValidPw = await userController.delete(req.token, pw);
    res.json({ deleteResult: isValidPw ? "Bye!" : true })
  } catch (err) {
    console.log("[DELETE ERROR] : ", err);
    res.json({ deleteResult: false });
  }
});

// 유저정보조회
router.post("/getUserData", jwtAuth.verifyToken, async (req, res) => {
  console.log("getUserData");
  try {
    const userData = await userController.getUserData(req.token);
    res.json({ getUserDataResult: req.token ? userData : false })
  } catch (err) {
    console.log("[GetUserData ERROR] : ", err);
    res.json({ getUserDataResult: false });
  }
});

module.exports = router;