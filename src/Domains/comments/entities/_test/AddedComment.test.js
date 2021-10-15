const AddedComment = require('../AddedComment');

describe('a AddedComment Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange, Action and Assert
    expect(() => new AddedComment({ id: 1, content: 1, username: 1 })).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'lorem ipsum',
      username: 'user',
    };

    // Action
    const comment = new AddedComment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.owner).toEqual(payload.username);
  });
});
