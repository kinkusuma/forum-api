class LikeRepository {
    async addLike({ post_id, username }) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async isLiked({ post_id, username }) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async removeLike({ post_id, username }) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getLikes(post_id) {
        throw new Error('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = LikeRepository;