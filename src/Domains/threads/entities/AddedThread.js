class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, username } = payload;

    this.id = id;
    this.title = title;
    this.owner = username;
  }

  _verifyPayload({ id, title, username }) {
    if (!id || !title || !username) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof username !== 'string') {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThread;
