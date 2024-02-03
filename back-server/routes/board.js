const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const boardController = require("../controllers/boardController");

// 해당 보드 정보조회
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

module.exports = router;