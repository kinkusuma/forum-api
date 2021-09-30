const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
  it('should be instance of CommentRepository domain', () => {
    const commentRepositoryPostgres = new CommentRepositoryPostgres({}, {}); // dummy dependency

    expect(commentRepositoryPostgres).toBeInstanceOf(CommentRepositoryPostgres);
  });

  describe('behavior test', () => {
    afterEach(async () => {
      await CommentsTableTestHelper.cleanTable();
      await ThreadsTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe('addComments function', () => {
      it('should persist new comment and return added comment correctly', async () => {
        const newComment = new NewComment({
          postId: 'thread-123',
          content: 'dicoding',
          owner: 'user',
        });
        const fakeIdGenerator = () => '123';
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

        const addedComment = await commentRepositoryPostgres
          .addComment(newComment);

        const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
        expect(addedComment).toStrictEqual(new AddedComment({
          id: 'comment-123',
          content: newComment.content,
          username: newComment.owner,
        }));
      });
    });

    describe('deleteComment', () => {
      it('should update is_delete to true', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, '');
        const data = {
          id: 'comment-123',
          postId: 'thread-123',
          content: 'dicoding',
          username: 'dicoding',
        };
        const comments = await CommentsTableTestHelper.addComment(data);
        await commentRepositoryPostgres.deleteComment('comment-123', 'thread-123');
        const getComment = await CommentsTableTestHelper.findCommentsById('comment-123');
        expect(getComment[0].is_delete).toEqual(true);
      });
    });

    describe('getCommentByPostId', () => {
      it('should get comments by thread id', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, '');
        await UsersTableTestHelper.addUser({
          id: 'user-123',
          username: 'user',
          password: 'secret',
          fullname: 'username',
        });
        await ThreadsTableTestHelper.addThread({
          id: 'thread-123',
          username: 'user-123',
          title: 'dicoding',
          body: 'dicoding',
        });
        await CommentsTableTestHelper.addComment({
          postId: 'thread-123',
          id: 'comment-123',
          username: 'user',
          content: 'lorem',
        });

        await commentRepositoryPostgres.getCommentByPostId('thread-123');
      });
    });

    describe('getCommentById', () => {
      it('should throw NotFoundError when comment not found', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, '');

        await expect(commentRepositoryPostgres.getCommentById('comment-123')).rejects
          .toThrowError(NotFoundError);
      });
    });
  });
});
