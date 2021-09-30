class GetThreadUseCase {
  constructor({ threadRepository, commentRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(params) {
    const { threadId } = params;
    const thread = await this._threadRepository.getThreadById(threadId);
    const comment = await this._commentRepository.getCommentByPostId(threadId);

    await Promise.all(comment.map(async (element, index) => {
      comment[index].replies = await this._commentRepository.getCommentByOtherCommentId(element.id);
      comment[index].likeCount = await this._likeRepository.getLikes(element.id);
    }));
    thread.comments = comment;
    return thread;
  }
}

module.exports = GetThreadUseCase;
