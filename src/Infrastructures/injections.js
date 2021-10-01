/* istanbul ignore file */

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres');
const CommentRepositoryPostgres = require('./repository/CommentRepositoryPostgres');
const LikeRepositoryPostgres = require('./repository/LikeRepositoryPostgres')
const BcryptEncryptionHelper = require('./security/BcryptEncryptionHelper');
const JwtTokenManager = require('./security/JwtTokenManager');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const AddThreadUseCase = require('../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../Applications/use_case/DeleteCommentUseCase');
const GetThreadUseCase = require('../Applications/use_case/GetThreadUseCase');
const AddReplyUseCase = require('../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../Applications/use_case/DeleteReplyUseCase');
const AddLikeCommentUseCase = require('../Applications/use_case/AddLikeCommentUseCase');

const serviceInstanceContainer = {
    userRepository: new UserRepositoryPostgres(pool, nanoid),
    authenticationRepository: new AuthenticationRepositoryPostgres(pool),
    threadRepository: new ThreadRepositoryPostgres(pool, nanoid),
    commentRepository: new CommentRepositoryPostgres(pool, nanoid),
    likeRepository: new LikeRepositoryPostgres(pool),
    encryptionHelper: new BcryptEncryptionHelper(bcrypt),
    authenticationTokenManager: new JwtTokenManager(Jwt.token),
};

const useCaseInstanceContainer = {
    addUserUseCase: new AddUserUseCase({
        userRepository: serviceInstanceContainer.userRepository,
        encryptionHelper: serviceInstanceContainer.encryptionHelper,
    }),
    loginUserUseCase: new LoginUserUseCase({
        authenticationRepository: serviceInstanceContainer.authenticationRepository,
        authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
        userRepository: serviceInstanceContainer.userRepository,
        encryptionHelper: serviceInstanceContainer.encryptionHelper,
    }),
    refreshAuthenticationUseCase: new RefreshAuthenticationUseCase({
        authenticationRepository: serviceInstanceContainer.authenticationRepository,
        authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
    }),
    logoutUserUseCase: new LogoutUserUseCase({
        authenticationRepository: serviceInstanceContainer.authenticationRepository,
    }),
    addThreadUseCase: new AddThreadUseCase({
        threadRepository: serviceInstanceContainer.threadRepository,
    }),
    getThreadUseCase: new GetThreadUseCase({
        threadRepository: serviceInstanceContainer.threadRepository,
        commentRepository: serviceInstanceContainer.commentRepository,
        likeRepository: serviceInstanceContainer.likeRepository
    }),
    addCommentUseCase: new AddCommentUseCase({
        commentRepository: serviceInstanceContainer.commentRepository,
        threadRepository: serviceInstanceContainer.threadRepository
    }),
    deleteCommentUseCase: new DeleteCommentUseCase({
        commentRepository: serviceInstanceContainer.commentRepository,
    }),
    addReplyUseCase: new AddReplyUseCase({
        threadRepository: serviceInstanceContainer.threadRepository,
        commentRepository: serviceInstanceContainer.commentRepository,
    }),
    deleteReplyUseCase: new DeleteReplyUseCase({
        commentRepository: serviceInstanceContainer.commentRepository,
    }),
    addLikeCommentUseCase: new AddLikeCommentUseCase({
        likeRepository: serviceInstanceContainer.likeRepository,
        commentRepository: serviceInstanceContainer.commentRepository,
        threadRepository: serviceInstanceContainer.threadRepository
    })

};

// export all instance
module.exports = {
    ...serviceInstanceContainer,
    ...useCaseInstanceContainer,
};