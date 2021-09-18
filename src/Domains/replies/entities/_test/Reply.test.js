const Reply = require('../Reply');

describe('a Reply entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new Reply(payload)).toThrowError('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: true,
            content: true,
            username: true,
            date: true,
            is_delete: '',
        };

        // Action and Assert
        expect(() => new Reply(payload)).toThrowError('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newReply object with delete message', () => {
        // Arrange
        const payload = {
            id: 'reply-123',
            content: 'dicoding',
            username: 'dicoding',
            date: '2021-08-22T13:52:54.016+07:00',
            is_delete: true,
        };

        // Action
        const reply = new Reply(payload);

        // Assert
        expect(reply.id).toEqual(payload.id);
        expect(reply.username).toEqual(payload.username);
        expect(reply.content).toEqual('**balasan telah dihapus**');
    });
    it('should create newReply object correctly', () => {
        // Arrange
        const payload = {
            id: 'reply-123',
            content: 'dicoding',
            username: 'dicoding',
            date: '2021-08-22T13:52:54.016+07:00',
            is_delete: false,
        };

        // Action
        const reply = new Reply(payload);

        // Assert
        expect(reply.id).toEqual(payload.id);
        expect(reply.username).toEqual(payload.username);
        expect(reply.content).toEqual(payload.content);
    });
});