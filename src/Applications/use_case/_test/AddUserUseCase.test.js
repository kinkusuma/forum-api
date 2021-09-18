const NewUser = require('../../../Domains/users/entities/NewUser');
const AddedUser = require('../../../Domains/users/entities/AddedUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const EncryptionHelper = require('../../security/EncryptionHelper');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };
    const expectedAddedUser = new AddedUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    const mockUserRepository = new UserRepository();
    const mockEncryptionHelper = new EncryptionHelper();

    /** mocking needed function */
    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockEncryptionHelper.encryptPassword = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedUser));

    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      encryptionHelper: mockEncryptionHelper,
    });

    const addedUser = await getUserUseCase.execute(useCasePayload);

    expect(addedUser).toStrictEqual(expectedAddedUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockEncryptionHelper.encryptPassword).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new NewUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
