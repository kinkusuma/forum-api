class AddedComment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, content, username } = payload;
        this.id = id;
        this.content = content;
        this.owner = username;
    }

    _verifyPayload({ id, content, username }) {
        if (!id || !content || !username) {
            throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' || typeof content !== 'string' || typeof username !== 'string') {
            throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddedComment;