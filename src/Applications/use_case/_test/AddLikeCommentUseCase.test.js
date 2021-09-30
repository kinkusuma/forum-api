const AddLikeCommentUseCase = require('../AddLikeCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const Likes = require('../../../Domains/likes/entities/Likes');

describe('AddLikeUseCase', () => {
  it('should return error if username not equal', async () => {
    const params = {
      threadId: '123',
      commentId: '456',
    };
    const credential = {
      id: 'dicoding',
    };
    const expectedIsLiked = new Likes({
      postId: '456',
      username: 'jhon',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve());
    mockLikeRepository.isLiked = jest.fn(() => Promise.resolve(expectedIsLiked));
    mockLikeRepository.removeLike = jest.fn(() => Promise.resolve());

    const addLikeCommentUseCase = new AddLikeCommentUseCase({
      likeRepository: mockLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await expect(addLikeCommentUseCase.execute(credential, params))
      .rejects
      .toThrowError('akses ditolak');
  });
  it('should orchestrating the remove like action correctly', async () => {
    const params = {
      threadId: '123',
      commentId: '456',
    };
    const credential = {
      id: 'dicoding',
    };
    const expectedIsLiked = new Likes({
      postId: '456',
      username: 'dicoding',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve());
    mockLikeRepository.isLiked = jest.fn(() => Promise.resolve(expectedIsLiked));
    mockLikeRepository.removeLike = jest.fn(() => Promise.resolve());

    const addLikeCommentUseCase = new AddLikeCommentUseCase({
      likeRepository: mockLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await addLikeCommentUseCase.execute(credential, params);
  });
  it('should orchestrating the add like action correctly', async () => {
    const params = {
      threadId: '123',
      commentId: '456',
    };
    const credential = {
      id: 'dicoding',
    };

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve());
    mockLikeRepository.isLiked = jest.fn(() => Promise.resolve(false));
    mockLikeRepository.addLike = jest.fn(() => Promise.resolve());

    const addLikeCommentUseCase = new AddLikeCommentUseCase({
      likeRepository: mockLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await addLikeCommentUseCase.execute(credential, params);
  });
});
