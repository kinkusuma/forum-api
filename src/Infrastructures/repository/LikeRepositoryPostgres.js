const LikeRepository = require('../../Domains/likes/LikeRepository');
const Likes = require('../../Domains/likes/entities/Likes');

class LikeRepositoryPostgres extends LikeRepository {
    constructor(pool) {
        super();
        this._pool = pool;
    }

    async addLike({ post_id, username }) {
        const query = {
            text: 'INSERT INTO likes VALUES ($1, $2)',
            values: [post_id, username]
        }
        await this._pool.query(query);
    }

    async isLiked({ post_id, username }) {
        const query = {
            text: 'SELECT * FROM likes WHERE post_id = $1 and username = $2',
            values: [post_id, username]
        }
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            return false
        } else {
            return new Likes({...result.rows[0] })
        }
    }

    async removeLike({ post_id, username }) {
        const query = {
            text: 'DELETE FROM likes WHERE post_id = $1 and username = $2',
            values: [post_id, username]
        }
        await this._pool.query(query);
    }

    async getLikes(post_id) {
        const query = {
            text: 'SELECT * FROM likes WHERE post_id = $1',
            values: [post_id]
        }
        const result = await this._pool.query(query);
        return result.rowCount;
    }
}

module.exports = LikeRepositoryPostgres;