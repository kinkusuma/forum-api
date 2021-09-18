class GetThreadUseCase {
    constructor({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
    }

    async execute(params) {
        const { threadId } = params;
        const thread = await this._threadRepository.getThreadById(threadId);
        const comment = await this._commentRepository.getCommentByPostId(threadId);

        await Promise.all(comment.map(async(element, index) => {
            comment[index].replies = await this._commentRepository.getCommentByOtherCommentId(element.id);
        }));
        thread.comments = comment;
        return thread;
    }
}

module.exports = GetThreadUseCase;