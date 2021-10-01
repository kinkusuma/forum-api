const Likes = require('../Likes');

describe('an add likes entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new Likes(payload).toThrowError('LIKE.NOT_CONTAIN_NEEDED_PROPERTY'));
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      postId: true,
      username: true,
    };

    // Action and Assert
    expect(() => new Likes(payload)).toThrowError('LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create like object correctly', () => {
    // Arrange
    const payload = {
      postId: 'comment-123',
      username: 'user-123',
    };

    // Action
    const like = new Likes(payload);

    // Assert
    expect(like.postId).toEqual(payload.postId);
    expect(like.username).toEqual(payload.username);
  });
});
