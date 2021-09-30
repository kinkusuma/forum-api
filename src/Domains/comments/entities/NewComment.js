class NewComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { postId, content, owner } = payload;

    this.postId = postId;
    this.content = content;
    this.owner = owner;
  }

  _verifyPayload({ postId, content, owner }) {
    if (!postId || !content || !owner) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof postId !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewComment;
