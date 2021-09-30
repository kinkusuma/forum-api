class Reply {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      content,
      username,
      date,
      isDelete,
    } = payload;

    this.content = isDelete === true ? '**balasan telah dihapus**' : content;
    this.username = username;
    this.id = id;
    this.date = date;
  }

  _verifyPayload({
    id,
    content,
    username,
    date,
    isDelete,
  }) {
    if (!id || !username || !date || !content) {
      throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof date !== 'string' || typeof content !== 'string' || typeof isDelete !== 'boolean') {
      throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Reply;
