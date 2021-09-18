const CommentRepository = require('../../../Domains/comments/CommentRepository');
const Comment = require('../../../Domains/comments/entities/Comment');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
    it('should throw error if username is not equal', async() => {
        const params = {
            threadId: 'thread-123',
            commentId: 'comment-123',

        };
        const credential = {
            username: 'another-user',
        };
        const expectedGetCommentById = new Comment({
            id: 'comment-123',
            content: 'dicoding',
            username: 'user',
            date: '2021-14-09',
            is_delete: false,
        });
        const mockCommentRepository = new CommentRepository();
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedGetCommentById));
        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        await expect(deleteCommentUseCase.execute(credential, params))
            .rejects
            .toThrowError('akses ditolak');
    });

    it('should orchestrating the delete comment action correctly', async() => {
        const params = {
            threadId: 'thread-123',
            commentId: 'comment-123',

        };
        const credential = {
            username: 'user',
        };
        const expectedGetCommentById = new Comment({
            id: 'comment-123',
            content: 'dicoding',
            username: 'user',
            date: '2021-09-14',
            is_delete: false,
        });
        const mockCommentRepository = new CommentRepository();
        mockCommentRepository.getCommentById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedGetCommentById));
        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        await deleteCommentUseCase.execute(credential, params);
    });
});