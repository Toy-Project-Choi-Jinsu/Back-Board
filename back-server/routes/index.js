const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const indexController = require("../controllers/indexController");

// 게시글 정보 불러오기
router.post("/getMainData", async (req, res) => {
    console.log("Get Main Data");
    try {
        const mainData = await indexController.getMainData();
        res.json({ getMainDataResult: mainData });
    } catch (err) {
        console.log("[GETMAINDATA ERROR] : ", err);
        res.json({ getMainDataResult: false });
    }
});

module.exports = router;