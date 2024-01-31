const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.post('/changeImg', async (req, res) => {
    console.log("changeImg", req.body);
    let { email, url, hash } = req.body;
    let changeImgSql = "update t_user set user_profile_img=?, user_profile_img_hash=? where user_email=?";
    try {
        await pool.query(changeImgSql, [url, hash, email]);
        console.log("Success ChangeImg : ", email);
        res.json({ chageImgResult: true });
    } catch (err) {
        console.log("[ChangeImg ERROR] : ", err);
        res.json({ chageImgResult: false });
    }
});

router.post('/changeBasicInfo', async (req, res) => {
    console.log("changeBasicInfo", req.body);
    let { email, name, intro } = req.body;
    let changeBasicInfoSql = "update t_user set user_name=?, user_intro=? where user_email=?";
    try {
        await pool.query(changeBasicInfoSql, [name, intro, email]);
        console.log("Success ChangeBasicInfo : ", email);
        res.json({ changeBasicInfoResult: true });
    } catch (err) {
        console.log("[ChangeBasicInfo ERROR] : ", err);
        res.json({ changeBasicInfoResult: false });
    }
});

router.post('/changeBoard', async (req, res) => {
    console.log("changeBoard", req.body);
    let { email, board } = req.body;
    let changeBoardSql = "update t_user set user_board=? where user_email=?";
    try {
        await pool.query(changeBoardSql, [board, email]);
        console.log("Success ChangeBoard : ", email);
        res.json({ changeBoardResult: true });
    } catch (err) {
        console.log("[ChangeBoard ERROR] : ", err);
        res.json({ changeBoardResult: false });
    }
});

router.post('/changeEmail', async (req, res) => {
    console.log("changeEmail", req.body);
    let { oldEmail, newEmail } = req.body;
    let changeEmailSql = "update t_user set user_email=? where user_email=?";
    try {
        await pool.query(changeEmailSql, [newEmail, oldEmail]);
        console.log("Success ChangeEmail : ", newEmail);
        res.json({ changeEmailResult: true });
    } catch (err) {
        console.log("[ChangeEmail ERROR] : ", err);
        res.json({ changeEmailResult: false });
    }
});

module.exports = router;
