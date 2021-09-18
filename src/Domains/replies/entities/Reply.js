class Reply {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, content, username, date, is_delete } = payload;

        this.content = is_delete === true ? '**balasan telah dihapus**' : content;
        this.username = username;
        this.id = id;
        this.date = date;
    }

    _verifyPayload({ id, content, username, date, is_delete }) {
        if (!id || !username || !date || !content) {
            throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' || typeof username !== 'string' || typeof date !== 'string' || typeof content !== 'string' || typeof is_delete !== 'boolean') {
            throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = Reply;