'use strict';

const Service = require('egg').Service;

class BookService extends Service {
  async find(data) {
    const user = await this.ctx.model.User.create(data);
    return user;
  }
}

module.exports = BookService;
