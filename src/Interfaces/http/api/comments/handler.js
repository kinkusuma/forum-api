class CommentHandler {
    constructor({ addCommentUseCase, deleteCommentUseCase, addLikeCommentUseCase }) {
        this._addCommentUseCase = addCommentUseCase;
        this._deleteCommentUseCase = deleteCommentUseCase;
        this._addLikeCommentUseCase = addLikeCommentUseCase;
        this.postCommentHandler = this.postCommentHandler.bind(this);
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
        this.commentLikeHandler = this.commentLikeHandler.bind(this)
    }

    async commentLikeHandler(request, h) {
        const commentLike = await this._addLikeCommentUseCase.execute(
            request.auth.credentials, request.params
        );
        const response = h.response({
            status: 'success'
        });
        response.code(200);
        return response;
    }

    async postCommentHandler(request, h) {
        const addedComment = await this._addCommentUseCase.execute(
            request.payload, request.auth.credentials, request.params,
        );
        const response = h.response({
            status: 'success',
            data: {
                addedComment,
            },
        });
        response.code(201);
        return response;
    }

    async deleteCommentHandler(request, h) {
        await this._deleteCommentUseCase.execute(
            request.auth.credentials, request.params,
        );
        const response = h.response({
            status: 'success',

        });
        response.code(200);
        return response;
    }
}

module.exports = CommentHandler;