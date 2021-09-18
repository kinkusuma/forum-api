class Comment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, content, username, date, is_delete } = payload;

        this.content = is_delete === true ? '**komentar telah dihapus**' : content;
        this.username = username;
        this.id = id;
        this.date = date;
    }

    _verifyPayload(payload) {
        if (this._isCommentNotContainNeededProperty(payload)) {
            throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (this._isCommentNotMeetDataTypeSpecification(payload)) {
            throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }

    _isCommentNotContainNeededProperty({ id, content, username, date }) {
        return (!id || !username || !date || !content);
    }

    _isCommentNotMeetDataTypeSpecification({ id, content, username, date, is_delete }) {
        return (
            typeof id !== 'string' ||
            typeof username !== 'string' ||
            typeof date !== 'string' ||
            typeof content !== 'string' ||
            typeof is_delete !== 'boolean'
        );
    }
}

module.exports = Comment;