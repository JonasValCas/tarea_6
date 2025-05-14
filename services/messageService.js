const Message = require('../models/messageModel');

class MessageService {
  constructor() {}

  async getAll() {
    return await Message.find({});
  }

  async create(data) {
    const message = new Message(data);
    return await message.save();
  }
}

module.exports = MessageService;