const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const payload = {
      title: 'lorem',
      body: 'body',
    };
    const credential = {
      id: '123',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: payload.title,
      username: credential.id,
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(expectedAddedThread));

    const getThreadUsecase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const addThreadUseCase = await getThreadUsecase.execute(payload, credential);

    expect(addThreadUseCase).toStrictEqual(expectedAddedThread);
  });
});
