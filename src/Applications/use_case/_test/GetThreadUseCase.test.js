const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('AddUserUseCase', () => {
    it('should orchestrating the add user action correctly', async() => {
        const params = {
            id: '123',
        };
        const expectedThread = new Thread({
            id: 'thread-123',
            username: 'user',
            title: 'lorem',
            body: 'lorem',
            date: '2021-14-09',
        });

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedThread));
        mockCommentRepository.getCommentByPostId = jest.fn()
            .mockImplementation(() => Promise.resolve([]));

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        const thread = await getThreadUseCase.execute(params);

        expect(thread).toStrictEqual(expectedThread);
    });
});