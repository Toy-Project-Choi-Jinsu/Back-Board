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

    getFollowState: async (thisBoard, loginBoard) => {
        const sql = `select *
                       from t_follow 
                      where fw_is_following = ?
                        and fw_is_followed = ?`;
        try {
            const result = await db.query(sql, [loginBoard, thisBoard]);
            if (result.length == 0) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    },

    followingBoard: async (thisBoard, loginBoard) => {
        const sql = `insert into t_follow (fw_is_following, fw_is_followed) values (?,?)`;
        try {
            return await db.query(sql, [loginBoard, thisBoard]);
        } catch (error) {
            throw error;
        }
    },

    unFollowingBoard: async (thisBoard, loginBoard) => {
        const sql = "delete from t_follow where fw_is_following = ? and fw_is_followed = ?"
        try {
            return await db.query(sql, [loginBoard, thisBoard]);
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