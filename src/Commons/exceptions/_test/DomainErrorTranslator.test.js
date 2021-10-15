const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('NEW_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
       .toStrictEqual(new InvariantError('unable to create a new user because the required property does not exist'));
    expect(DomainErrorTranslator.translate(new Error('NEW_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
       .toStrictEqual(new InvariantError('unable to create a new user because the data type does not match'));
    expect(DomainErrorTranslator.translate(new Error('NEW_USER.USERNAME_LIMIT_CHAR'))))
       .toStrictEqual(new InvariantError('unable to create a new user because the username character exceeds the limit'));
    expect(DomainErrorTranslator.translate(new Error('NEW_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
       .toStrictEqual(new InvariantError('Cannot create new user because username contains forbidden character'));
  });

  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some_error_message');

    // Action
    const translatedError = DomainErrorTranslator.translate(error);

    // Assert
    expect(translatedError).toStrictEqual(error);
  });
});
