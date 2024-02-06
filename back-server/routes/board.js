const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const boardController = require("../controllers/boardController");

// 해당 보드 주인 정보 여부 조회
router.post("/getThisBoardData", async (req, res) => {
    console.log("getThisBoardData");
    const { thisBoard } = req.body;
    try {
        const thisBoardData = await boardController.getThisBoardData(thisBoard);
        res.json({ getThisBoardDataResult: thisBoardData[0] })
    } catch (err) {
        console.log("[GetThisBoardData ERROR] : ", err);
        res.json({ getThisBoardDataResult: false });
    }
});

// 팔로우 상태 조회
router.post("/getFollowState", async (req, res) => {
    console.log("getFollowState");
    const { thisBoard, loginBoard } = req.body;
    try {
        const followState = await boardController.getFollowState(thisBoard, loginBoard);
        if (followState) {
            res.json({ followState: followState })
        } else {
            res.json({ followState: followState })
        }
    } catch (err) {
        console.log("[GetFollowState ERROR] : ", err);
        res.json({ followState: undefined });
    }
});

// 팔로워, 팔로잉 수 조회
router.post("/getFollowNumber", async (req, res) => {
    console.log("getFollowNumber");
    const { thisBoard } = req.body;
    try {
        const followNumber = await boardController.getFollowNumber(thisBoard);
        res.json({ followNumber: followNumber })
    } catch (err) {
        console.log("[GetFollowNumber ERROR] : ", err);
        res.json({ followNumber: false });
    }
});

// 팔로워 리스트 조회
router.post("/getFollowerList", async (req, res) => {
    console.log("getFollowerList");
    const { thisBoard, loginBoard } = req.body;
    try {
        const followerList = await boardController.getFollowerList(thisBoard, loginBoard);
        res.json({ followerList: followerList })
    } catch (err) {
        console.log("[GetFollowerList ERROR] : ", err);
        res.json({ followerList: false });
    }
});

// 팔로잉 리스트 조회
router.post("/getFollowingList", async (req, res) => {
    console.log("getFollowingList");
    const { thisBoard } = req.body;
    try {
        const followingList = await boardController.getFollowingList(thisBoard);
        res.json({ followingList: followingList })
    } catch (err) {
        console.log("[GetFollowingList ERROR] : ", err);
        res.json({ followingList: false });
    }
});

// 팔로우
router.post("/followingBoard", async (req, res) => {
    console.log("followingBoard");
    const { thisBoard, loginBoard } = req.body;
    try {
        await boardController.followingBoard(thisBoard, loginBoard);
        res.json({ followingBoardResult: true })
    } catch (err) {
        console.log("[FollowingBoard ERROR] : ", err);
        res.json({ followingBoardResult: false });
    }
});

// 언팔로우
router.post("/unFollowingBoard", async (req, res) => {
    console.log("unFollowingBoard");
    const { thisBoard, loginBoard } = req.body;
    try {
        await boardController.unFollowingBoard(thisBoard, loginBoard);
        res.json({ unFollowingBoardResult: false })
    } catch (err) {
        console.log("[UnFollowingBoard ERROR] : ", err);
        res.json({ unFollowingBoardResult: true });
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