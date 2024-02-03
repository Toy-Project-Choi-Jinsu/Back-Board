const db = require("./db");

module.exports = {
    getThisBoardData: async (thisBoard) => {
        const sql = `select user_email, user_name, user_board, user_profile_img, user_intro
                       from t_user 
                      where user_board = ?`;
        try {
            return await db.query(sql, [thisBoard]);
        } catch (error) {
            throw error;
        }
    },

    getThisBoardList: async (thisBoard) => {
        const sql = `select * from t_board where user_board = ?`;
        try {
            return await db.query(sql, [thisBoard]);
        } catch (error) {
            throw error;
        }
    },
}