const Likes = require('../../Domains/likes/entities/Likes');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class addLikeCommentUseCase {
    constructor({ likeRepository, commentRepository, threadRepository }) {
        this._likeRepository = likeRepository;
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(credential, params) {
        const { threadId, commentId } = params;
        const username = credential.id;
        await this._threadRepository.getThreadById(threadId);
        await this._commentRepository.getCommentById(commentId);
        const addLike = new Likes({ post_id: commentId, username })
        const isLiked = await this._likeRepository.isLiked(addLike);
        if (isLiked) {
            if (isLiked.username !== username) {
                throw new AuthorizationError('akses ditolak');
            }
            await this._likeRepository.removeLike(addLike)
        } else {
            await this._likeRepository.addLike(addLike)
        }
    }
}

module.exports = addLikeCommentUseCase;