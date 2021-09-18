const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new AddedThread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: true,
            title: true,
            username: true,
        };

        // Action and Assert
        expect(() => new AddedThread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create Addedthread object correctly', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'title',
            username: 'user'
        };

        // Action
        const thread = new AddedThread(payload);

        // Assert
        expect(thread.id).toEqual(payload.id);
        expect(thread.title).toEqual(payload.title);
        expect(thread.owner).toEqual(payload.username);
    });
});