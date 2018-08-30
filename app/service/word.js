'use strict';

const Service = require('egg').Service;

class WordService extends Service {
  async getList(data) {
    const user = await this.ctx.model.User.create(data);
    return user;
  }
}

module.exports = WordService;
