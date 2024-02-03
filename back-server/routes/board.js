const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const boardController = require("../controllers/boardController");

// 해당 보드 주인 정보조회
router.post("/getThisBoardData", async (req, res) => {
    console.log("getThisBoardData");
    const { thisBoard } = req.body;
    try {
        const thisBoardData = await boardController.getThisBoardData(thisBoard);
        res.json({ getThisBoardDataResult: thisBoardData[0] })
    } catch (err) {
        console.log("[GetThisBoardData ERROR] : ", err);
        res.json({ getThisBoardData: false });
    }
});

// 해당 보드 리스트조회
router.post("/getThisBoardList", async (req, res) => {
    console.log("getThisBoardList");
    const { thisBoard } = req.body;
    try {
        const thisBoardList = await boardController.getThisBoardList(thisBoard);
        res.json({ getThisBoardListResult: thisBoardList })
    } catch (err) {
        console.log("[GetThisBoardList ERROR] : ", err);
        res.json({ getThisBoardListResult: false });
    }
});

module.exports = router;