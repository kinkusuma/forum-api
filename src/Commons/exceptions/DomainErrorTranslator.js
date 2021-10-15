const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'NEW_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Cannot create new user because required property does not exist'),
  'NEW_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Could not create a new user because the data type does not match'),
  'NEW_USER.USERNAME_LIMIT_CHAR': new InvariantError('Cannot create a new user because the username character exceeds the limit'),
  'NEW_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('Cannot create new user because username contains forbidden characters'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('must submit username and password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username and password must be string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('must send refresh token'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token must be a string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('must send refresh token'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token must be a string'),
  'THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Could not create new thread because required property does not exist'),
  'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Could not create a new thread because the data type does not match'),
  'THREAD.NOT_FOUND': new InvariantError('thread not found'),
  'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('unable to comment because required property does not exist'),
  'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to comment because data type does not match'),
  'REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Could not reply because required property does not exist'),
  'REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to reply because data type does not match'),
  'LIKE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('unable to like because required property does not exist'),
  'LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to like because data type does not match'),

};

module.exports = DomainErrorTranslator;
