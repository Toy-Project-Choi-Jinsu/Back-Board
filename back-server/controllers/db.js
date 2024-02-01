const pool = require("../config/database");

module.exports = {
    query: async (sql, values) => {
        try {
            const [result] = await pool.query(sql, values);
            return result
        } catch (error) {
            throw error;
        }
    }
}