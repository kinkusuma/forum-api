const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: true,
      content: true,
      username: true,
      date: true,
      isDelete: '',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newComment object with delete message', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'dicoding',
      username: 'dicoding',
      date: '2021-08-22T13:52:54.016+07:00',
      isDelete: true,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.username).toEqual(payload.username);
    expect(comment.content).toEqual('**komentar telah dihapus**');
  });
  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'dicoding',
      username: 'dicoding',
      date: '2021-08-22T13:52:54.016+07:00',
      isDelete: false,
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.username).toEqual(payload.username);
    expect(comment.content).toEqual(payload.content);
  });
});
