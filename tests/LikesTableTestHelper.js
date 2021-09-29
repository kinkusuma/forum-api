/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
    async addLike({ post_id, username }) {
        const query = {
            text: 'INSERT INTO likes VALUES ($1, $2)',
            values: [post_id, username]
        }
        await pool.query(query);
    },

    async findLike({ post_id, username }) {
        const query = {
            text: 'SELECT * FROM likes WHERE post_id = $1 and username = $2',
            values: [post_id, username]
        }
        const result = await pool.query(query);
        return result.rows[0];
    },

    async cleanTable() {
        await pool.query('DELETE FROM likes  WHERE 1=1');
    },
}

module.exports = LikesTableTestHelper;