const db = require("./db");

module.exports = {
    getMainData: async () => {
        const sql = 'select * from t_board';
        try {
            return await db.query(sql);
        } catch (error) {
            throw error;
        }
    },
}