class NewComment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { post_id, content, owner } = payload;

        this.post_id = post_id;
        this.content = content;
        this.owner = owner;
    }

    _verifyPayload({ post_id, content, owner }) {
        if (!post_id || !content || !owner) {
            throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof post_id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
            throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = NewComment;