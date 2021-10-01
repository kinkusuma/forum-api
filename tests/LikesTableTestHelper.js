/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
    async addLike({ postId, username }) {
        const query = {
            text: 'INSERT INTO likes VALUES ($1, $2)',
            values: [postId, username]
        }
        await pool.query(query);
    },

    async findLike({ postId, username }) {
        const query = {
            text: 'SELECT * FROM likes WHERE post_id = $1 and username = $2',
            values: [postId, username]
        }
        const result = await pool.query(query);
        return result.rows[0];
    },

    async cleanTable() {
        await pool.query('DELETE FROM likes  WHERE 1=1');
    },
}

module.exports = LikesTableTestHelper;