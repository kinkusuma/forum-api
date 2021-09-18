const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new NewComment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {

        // Arrange, Action and Assert
        expect(() => new NewComment({ post_id: 1, content: 1, owner: 1 })).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newComment object correctly', () => {
        // Arrange
        const payload = {
            post_id: 'thread-123',
            content: 'lorem',
            owner: 'user'
        };

        // Action
        const comment = new NewComment(payload);

        // Assert
        expect(comment.id).toEqual(payload.id);
        expect(comment.owner).toEqual(payload.owner);
        expect(comment.post_id).toEqual(payload.post_id);
    });
});