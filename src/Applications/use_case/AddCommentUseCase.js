const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(payload, credential, params) {
        const { threadId } = params;
        const { content } = payload;
        const owner = credential.id;
        await this._threadRepository.getThreadById(threadId);
        const newComment = new NewComment({ post_id: threadId, content, owner });
        return this._commentRepository.addComment(
            newComment,
        );
    }
}

module.exports = AddCommentUseCase;