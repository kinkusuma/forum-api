const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');


describe('ThreadRepositoryPostgres', () => {
    it('should be instance of ThreadRepository domain', () => {
        const threadRepositoryPostgres = new ThreadRepositoryPostgres({}, {}); // dummy dependency

        expect(threadRepositoryPostgres).toBeInstanceOf(ThreadRepository);
    });

    describe('behavior test', () => {
        afterEach(async() => {
            await ThreadsTableTestHelper.cleanTable();
            await UsersTableTestHelper.cleanTable();
        });

        afterAll(async() => {
            await pool.end();
        });

        describe('addThread', () => {
            it('should persist new thread and return added thread correctly', async() => {

                // Arrange
                const newThread = new NewThread({
                    owner: 'user',
                    title: 'lorem',
                    body: 'lorem',
                });
                const fakeIdGenerator = () => '123'; // stub!
                const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                const addedThread = await threadRepositoryPostgres.addThread(newThread);

                // Assert
                expect(addedThread).toStrictEqual(new AddedThread({
                    id: 'thread-123',
                    title: newThread.title,
                    username: newThread.owner,
                }));
            });
        });

        describe('getThread', () => {
            it('should throw NotFoundError when thread not found', async() => {
                // Arrange
                const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

                // Action & Assert
                await expect(threadRepositoryPostgres.getThreadById('0'))
                    .rejects
                    .toThrowError(NotFoundError);
            });
            it('should return thread id correctly', async() => {
                await UsersTableTestHelper.addUser({
                    id: 'user-123',
                    username: 'user',
                    password: 'secret',
                    fullname: 'username',
                });
                await ThreadsTableTestHelper.addThread({
                    id: 'thread-123',
                    username: 'user-123',
                    title: 'dicoding',
                    body: 'dicoding',
                });

                const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, '');

                const getThread = await threadRepositoryPostgres.getThreadById('thread-123');
                expect(getThread.id).toEqual('thread-123');
            });
        });
    });
});