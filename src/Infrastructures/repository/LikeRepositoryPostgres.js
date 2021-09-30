const LikeRepository = require('../../Domains/likes/LikeRepository');
const Likes = require('../../Domains/likes/entities/Likes');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addLike({ postId, username }) {
    const query = {
      text: 'INSERT INTO likes VALUES ($1, $2)',
      values: [postId, username],
    };
    await this._pool.query(query);
  }

  async isLiked({ postId, username }) {
    const query = {
      text: 'SELECT * FROM likes WHERE post_id = $1 and username = $2',
      values: [postId, username],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return new Likes({ postId: result.rows[0].post_id, ...result.rows[0] });
  }

  async removeLike({ postId, username }) {
    const query = {
      text: 'DELETE FROM likes WHERE post_id = $1 and username = $2',
      values: [postId, username],
    };
    await this._pool.query(query);
  }

  async getLikes(postId) {
    const query = {
      text: 'SELECT * FROM likes WHERE post_id = $1',
      values: [postId],
    };
    const result = await this._pool.query(query);
    return result.rowCount;
  }
}

module.exports = LikeRepositoryPostgres;
