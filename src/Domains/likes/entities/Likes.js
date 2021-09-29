class Likes {
    constructor(payload) {
        this._verifyPayload(payload);
        const { post_id, username } = payload;

        this.post_id = post_id;
        this.username = username;
    }

    _verifyPayload({ post_id, username }) {
        if (!post_id || !username) {
            throw new Error('LIKE.NOT_CONTAIN_NEEDED_PROPERTY')
        }
        if (typeof post_id !== 'string' || typeof username !== 'string') {
            throw new Error('LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = Likes;