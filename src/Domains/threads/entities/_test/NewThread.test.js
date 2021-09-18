const NewThread = require('../NewThread');

describe('a AddedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            owner: true,
            title: true,
            body: true,
        };

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newthread object correctly', () => {
        // Arrange
        const payload = {
            owner: 'user-123',
            body: 'dicoding',
            title: 'dicoding',
        };

        // Action
        const thread = new NewThread(payload);

        // Assert
        expect(thread.body).toEqual(payload.body);
        expect(thread.owner).toEqual(payload.owner);
        expect(thread.title).toEqual(payload.title);
    });
});