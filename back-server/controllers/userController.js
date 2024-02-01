const db = require("./db");

module.exports = {
    checkDupBoard: async (board) => {
        const sql = "select * from t_user where user_board = ?";
        try {
            const result = await db.query(sql, [board]);
            return result.length === 0;
        } catch (error) {
            throw error
        }
    },

    checkDupEmail: async (email) => {
        const sql = "select * from t_user where user_email = ?";
        try {
            const result = await db.query(sql, [email]);
            return result.length === 0;
        } catch (error) {
            throw error
        }
    },

    join: async (email, pw, name, board, intro) => {
        const sql = `insert into t_user (user_email, user_pw, user_name, user_board, joined_type, user_intro)
                                 values (?,SHA2(?,384),?,?,'general',?)`;
        try {
            return await db.query(sql, [email, pw, name, board, intro]);
        } catch (error) {
            throw error
        }
    },

    login: async (email, pw) => {
        const sql = 'select user_email from t_user where user_email = ? and user_pw =sha2(?,384)';
        try {
            const result = await db.query(sql, [email, pw]);
            return result.length != 0;
        } catch (error) {
            throw error
        }
    },

    getUserData: async (token) => {
        const sql = `select user_email, user_name, user_board, user_profile_img, joined_type, user_intro
                       from t_user 
                      where user_email = ?`;
        try {
            const result = await db.query(sql, [token]);
            return result[0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (token, pw) => {
        const sql = "delete from t_user where user_email=? and user_pw=SHA2(?,384)"
        try {
            const result = await db.query(sql, [token, pw]);
            return result.affectedRows === 1;
        } catch (error) {
            throw error
        }
    },
}