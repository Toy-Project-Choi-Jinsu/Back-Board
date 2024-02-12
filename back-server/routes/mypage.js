const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const mypageController = require("../controllers/mypageController");

router.post('/changeBasicInfo', jwtAuth.verifyToken, async (req, res) => {
    console.log("Change Basic Information");
    const { name, intro } = req.body;
    try {
        await mypageController.changeBasicInfo(name, intro, req.token)
        res.json({ changeBasicInfoResult: true });
    } catch (err) {
        console.log("[ChangeBasicInfo ERROR] : ", err);
        res.json({ changeBasicInfoResult: false });
    }
});

router.post('/changeBoard', jwtAuth.verifyToken, async (req, res) => {
    console.log("Change Board");
    const { board } = req.body;
    try {
        await mypageController.changeBoard(board, req.token);
        res.json({ changeBoardResult: true });
    } catch (err) {
        console.log("[ChangeBoard ERROR] : ", err);
        res.json({ changeBoardResult: false });
    }
});

router.post('/changeEmail', jwtAuth.verifyToken, async (req, res) => {
    console.log("Change Email");
    const { email } = req.body;
    try {
        await mypageController.changeEmail(email, req.token);
        const payload = { user_email: email }
        const newAccessToken = jwtAuth.signToken(payload, '1h');
        res.json({ changeEmailResult: true, newAccessToken: newAccessToken });
    } catch (err) {
        console.log("[ChangeEmail ERROR] : ", err);
        res.json({ changeEmailResult: false });
    }
});

module.exports = router;
