const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

describe('likeRepository postgres', () => {
  it('should be instance of Repository domain', () => {
    const likeRepository = new LikeRepositoryPostgres();
    expect(likeRepository).toBeInstanceOf(LikeRepository);
  });

  describe('behavior test', () => {
    afterEach(async () => {
      await LikesTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe('add like func', () => {
      it('should add like to database', async () => {
        // Arrange
        const payload = {
          postId: '123',
          username: 'user',
        };
        const likeRepository = new LikeRepositoryPostgres(pool);

        // Action
        await likeRepository.addLike(payload);

        // Assert
        const result = await LikesTableTestHelper.findLike(payload);
        expect(result.post_id).toBe(payload.postId);
        expect(result.username).toBe(payload.username);
      });
    });

    describe('is like func', () => {
      it('should be return false', async () => {
        // Arrange
        const payload = {
          postId: '123',
          username: 'user',
        };
        const likeRepository = new LikeRepositoryPostgres(pool);

        // Action
        const result = await likeRepository.isLiked(payload);

        // Assert
        expect(result).toBe(false);
      });

      it('should be return like data', async () => {
        // Arrange
        const payload = {
          postId: '123',
          username: 'user',
        };
        const likeRepository = new LikeRepositoryPostgres(pool);
        await LikesTableTestHelper.addLike(payload);

        // Action
        const result = await likeRepository.isLiked(payload);

        // Assert
        expect(result.postId).toBe(payload.postId);
        expect(result.username).toBe(payload.username);
      });
    });
    describe('get like func', () => {
      it('should be return 1', async () => {
        // Arrange
        const payload = {
          postId: '123',
          username: 'user',
        };
        const likeRepository = new LikeRepositoryPostgres(pool);
        await LikesTableTestHelper.addLike(payload);

        // Action
        const result = await likeRepository.getLikes(payload.postId);

        // Assert
        expect(result).toBe(1);
      });
    });
  });
});
