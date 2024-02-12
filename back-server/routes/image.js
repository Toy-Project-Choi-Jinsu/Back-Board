const express = require("express");
const router = express.Router();
const jwtAuth = require("../controllers/jwtAuth");
const indexController = require("../controllers/indexController");
const imageController = require("../controllers/imageController");
const cloudinary = require('../config/cloudinary')
// router.post('/changeImg', jwtAuth.verifyToken, upload.single('image'), async (req, res) => {
//     console.log("Change Image");
//     const { url } = req.body;
//     try {
//         await mypageController.changeImg(url, req.token);
//         res.json({ changeImgResult: true })
//     } catch (error) {
//         console.log("[ChangeImg ERROR] : ", err);
//         res.json({ chageImgResult: false });
//     }
// });

router.post('/changeImg', jwtAuth.verifyToken, imageController.parser.single('image'), async (req, res) => {
    // Cloudinary에 이미지 업로드
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
        try {
            await imageController.changeImg(result.secure_url, req.token);
            res.json({ changeImgResult: result.secure_url })
        } catch (err) {
            console.log("[ChangeImg ERROR] : ", error);
            res.json({ chageImgResult: false });
        }
    });
});

router.post('/uploadBoardImg', jwtAuth.verifyToken, imageController.parser.single('image'), async (req, res) => {
    // Cloudinary에 이미지 업로드
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
        try {
            res.json({ uploadBoardImgResult: result.secure_url })
        } catch (err) {
            console.log("[UploadBoardImg ERROR] : ", error);
            res.json({ uploadBoardImgResult: false });
        }
    });
});

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