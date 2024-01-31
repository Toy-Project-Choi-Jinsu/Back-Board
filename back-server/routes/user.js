const express = require("express");
const jwt = require("jsonwebtoken");
const getJwtAuth = require("./jwtAuth");
const router = express.Router();
const pool = require("../config/database");

// 회원가입 관련 로직
// 보드명 중복 체크
router.post("/join/checkDupBoard", async (req, res) => {
  console.log("checkDupBoard", req.body);
  let { board } = req.body;
  let checkDupBoardSql = "select * from t_user where user_board = ?";
  try {
    const [checkDupBoardRows] = await pool.query(checkDupBoardSql, [board]);
    if (checkDupBoardRows.length == 0) {
      console.log("Valid Board : ", board);
      res.json({
        checkDupBoardResult: board
      });
    } else {
      console.log("Invalid Board : ", board);
      res.json({ checkDupBoardResult: true });
    }
  } catch (err) {
    console.log("[CheckDupBoard ERROR] : ", err);
    res.json({ checkDupBoardResult: false });
  }
});

// 이메일 중복 체크
router.post("/join/checkDupEmail", async (req, res) => {
  console.log("checkDupEmail", req.body);
  let { email } = req.body;
  let checkDupEmailSql = "select * from t_user where user_email = ?";
  try {
    const [checkDupEmailRows] = await pool.query(checkDupEmailSql, [email]);
    if (checkDupEmailRows.length == 0) {
      console.log("Valid Email : ", email);
      res.json({
        checkDupEmailResult: email
      });
    } else {
      console.log("Invalid Email : ", email);
      res.json({ checkDupEmailResult: true });
    }
  } catch (err) {
    console.log("[CheckDupEmail ERROR] : ", err);
    res.json({ checkDupEmailResult: false });
  }
});

// 회원가입
router.post("/join", async (req, res) => {
  console.log("Join", req.body);
  let { email, pw, name, board, intro } = req.body;
  let joinSql = `insert into t_user (user_email, user_pw, user_name, user_board, joined_type, user_intro)
                                 values (?,SHA2(?,384),?,?,'general',?)`;
  try {
    await pool.query(joinSql, [email, pw, name, board, intro]);
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
  let { email, pw } = req.body;
  let loginSql = `select user_email, user_name, user_board, user_profile_img, joined_type, user_intro
                      from t_user 
                     where user_email = ?
                       and user_pw =sha2(?,384)`;
  try {
    const [loginRows] = await pool.query(loginSql, [email, pw]);
    if (loginRows.length != 0) {
      const payload = { user_email: loginRows[0].user_email }
      const key = process.env.SECRECT_KEY
      const accessToken = jwt.sign(payload, key, { expiresIn: '15m' })
      console.log("Success Login : ", email);
      res.json({ loginResult: accessToken });
    } else {
      console.log("Fail Login!");
      res.json({ loginResult: true });
    }
  } catch (err) {
    console.log("[LOGIN ERROR] : ", err);
    res.json({ loginResult: false });
  }
});

// 유저정보조회
router.post("/getUserData", async (req, res) => {
  console.log("getUserData", req.body);
  const key = process.env.SECRECT_KEY
  let { accessToken } = req.body;
  let getUserDataSql = `select user_email, user_name, user_board, user_profile_img, joined_type, user_intro
                      from t_user 
                     where user_email = ?`;
  try {
    const user_email = getJwtAuth(accessToken, key);
    if (user_email) {
      const [getUserDataSqlRows] = await pool.query(getUserDataSql, [user_email]);
      console.log("Success GetUserData : ", user_email);
      res.json({ getUserDataResult: getUserDataSqlRows[0] })
    } else {
      res.json({ getUserDataResult: false })
    }
  } catch (err) {
    console.log("[GetUserData ERROR] : ", err);
    res.json({ getUserDataResult: false });
  }
});

module.exports = router;