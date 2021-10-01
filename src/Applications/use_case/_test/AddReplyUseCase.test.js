const AddReplyUseCase = require('../AddReplyUseCase');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddReplyUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const payload = {
      content: 'secret',
    };
    const credential = {
      id: '123',
    };
    const params = {
      threadId: '123',
      commentId: '456',
    };
    const expectedAddedReply = new AddedComment({
      id: 'comment-123',
      content: payload.content,
      username: credential.id,
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedAddedReply));

    const getCommentUseCase = new AddReplyUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addCommentUseCase = await getCommentUseCase.execute(payload, credential, params);

    expect(addCommentUseCase).toStrictEqual(expectedAddedReply);
  });
});
