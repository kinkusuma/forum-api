const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(payload, credential) {
        const { title, body } = payload;
        const owner = credential.id;
        const newThread = new NewThread({ owner, title, body });
        return this._threadRepository.addThread(
            newThread
        );
    }
}

module.exports = AddThreadUseCase;