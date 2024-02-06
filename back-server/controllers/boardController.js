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

    getFollowNumber: async (thisBoard) => {
        const sql = `SELECT follower.count AS follower,
                            following.count AS following
                       FROM (SELECT COUNT(*) AS count
                               FROM t_follow
                              WHERE fw_is_followed = ?) AS follower
                 INNER JOIN (SELECT COUNT(*) AS count
                               FROM t_follow
                              WHERE fw_is_following = ?) AS following`
        try {
            const followerNumber = await db.query(sql, [thisBoard, thisBoard]);
            return followerNumber[0];
        } catch (error) {
            throw error;
        }
    },

    getFollowerList: async (thisBoard) => {
        const sql = `SELECT JSON_ARRAYAGG(fw_is_following) AS list
                       FROM t_follow
                      WHERE fw_is_followed = ?`
        try {
            const follower = await db.query(sql, [thisBoard]);
            console.log(follower);
            return follower[0].list;
        } catch (error) {
            throw error;
        }
    },

    getFollowingList: async (thisBoard) => {
        const sql = `SELECT JSON_ARRAYAGG(fw_is_followed) AS list
                       FROM t_follow
                      WHERE fw_is_following = ?`
        try {
            const following = await db.query(sql, [thisBoard]);
            return following[0].list;
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