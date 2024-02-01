const db = require("./db");

module.exports = {
    changeImg: async (url, token) => {
        const sql = "update t_user set user_profile_img=? where user_email=?";
        try {
            await db.query(sql, [url, token]);
        } catch (error) {
            throw error
        }
    },

    changeBasicInfo: async (name, intro, token) => {
        const sql = "update t_user set user_name=?, user_intro=? where user_email=?";
        try {
            await db.query(sql, [name, intro, token]);
        } catch (error) {
            throw error
        }
    },

    changeBoard: async (board, token) => {
        const sql = "update t_user set user_board=? where user_email=?";
        try {
            await db.query(sql, [board, token]);
        } catch (error) {
            throw error
        }
    },

    changeEmail: async (email, token) => {
        const sql = "update t_user set user_email=? where user_email=?";
        try {
            await db.query(sql, [email, token]);
        } catch (error) {
            throw error
        }
    },
}