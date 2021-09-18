const NewComment = require('../../Domains/comments/entities/NewComment');

class AddReplyUseCase {
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(payload, credential, params) {
        const { threadId, commentId } = params;
        const { content } = payload;
        const owner = credential.id;
        await this._threadRepository.getThreadById(threadId);
        await this._commentRepository.getCommentById(commentId);
        const newComment = new NewComment({ post_id: commentId, content, owner });
        return this._commentRepository.addComment(
            newComment
        );
    }
}

module.exports = AddReplyUseCase;