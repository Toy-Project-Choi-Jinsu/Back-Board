const db = require("./db");
const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: async (req, file) => req.headers['type'], // 업로드할 폴더
        public_id: async (req, file) => req.headers['id'], // 파일 이름 설정
        overwrite: async (req, file) => req.headers['overwrite'],
        format: async (req, file) => 'png', // 이미지 형식 (여기서는 png로 고정)
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // 이미지 변환 옵션 (크기 조절 등)
    }
});

module.exports = {
    parser: multer({ storage: storage }),

    changeImg: async (url, token) => {
        const sql = "update t_user set user_profile_img=? where user_email=?";
        try {
            await db.query(sql, [url, token]);
        } catch (error) {
            throw error
        }
    },

    // uploadBoardImg: async (url, token) => {
    //     const sql = "update t_user set user_profile_img=? where user_email=?";
    //     try {
    //         await db.query(sql, [url, token]);
    //     } catch (error) {
    //         throw error
    //     }
    // },

    // getMainData: async () => {
    //     const sql = 'select * from t_board';
    //     try {
    //         return await db.query(sql);
    //     } catch (error) {
    //         throw error;
    //     }
    // },
}