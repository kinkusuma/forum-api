const AddCommentUseCase = require('../AddCommentUseCase');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const payload = {
      content: 'content',
    };
    const credential = {
      id: 'user',
    };
    const params = {
      threadId: '321',
    };
    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: payload.content,
      username: credential.id,
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedAddedComment));

    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addCommentUseCase = await getCommentUseCase.execute(payload, credential, params);

    expect(addCommentUseCase).toStrictEqual(expectedAddedComment);
  });
});
