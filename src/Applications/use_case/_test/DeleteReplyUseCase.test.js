const CommentRepository = require('../../../Domains/comments/CommentRepository');
const Reply = require('../../../Domains/replies/entities/Reply');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should throw error if username is not equal', async () => {
    const params = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      replyId: 'comment-456',
    };
    const credential = {
      username: 'another-user',
    };
    const expectedGetCommentById = new Reply({
      id: 'comment-123',
      content: 'dicoding',
      username: 'user',
      date: '2021-14-09',
      isDelete: false,
    });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve(expectedGetCommentById));
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      commentRepository: mockCommentRepository,
    });

    await expect(deleteReplyUseCase.execute(credential, params))
      .rejects
      .toThrowError('akses ditolak');
  });

  it('should orchestrating the delete reply action correctly', async () => {
    const params = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      replyId: 'comment-456',
    };
    const credential = {
      username: 'user',
    };
    const expectedGetCommentById = new Reply({
      id: 'comment-123',
      content: 'dicoding',
      username: 'user',
      date: '2021-14-09',
      isDelete: false,
    });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve(expectedGetCommentById));
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      commentRepository: mockCommentRepository,
    });

    await deleteReplyUseCase.execute(credential, params);
  });
});
