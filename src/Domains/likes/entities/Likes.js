class Likes {
  constructor(payload) {
    this._verifyPayload(payload);
    const { postId, username } = payload;

    this.postId = postId;
    this.username = username;
  }

  _verifyPayload({ postId, username }) {
    if (!postId || !username) {
      throw new Error('LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof postId !== 'string' || typeof username !== 'string') {
      throw new Error('LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Likes;
