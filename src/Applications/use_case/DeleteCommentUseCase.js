const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class DeleteCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(credential, params) {
    const { threadId, commentId } = params;
    const { username } = credential;
    const comment = await this._commentRepository.getCommentById(commentId);
    if (comment.username !== username) {
      throw new AuthorizationError('akses ditolak');
    }
    await this._commentRepository.deleteComment(
      commentId, threadId,
    );
  }
}

module.exports = DeleteCommentUseCase;
