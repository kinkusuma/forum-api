const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class DeleteReplyUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(credential, params) {
    const { threadId, commentId, replyId } = params;
    const { username } = credential;
    const reply = await this._commentRepository.getCommentById(replyId);
    if (reply.username !== username) {
      throw new AuthorizationError('akses ditolak');
    }
    await this._commentRepository.deleteComment(
      replyId, commentId,
    );
  }
}

module.exports = DeleteReplyUseCase;
