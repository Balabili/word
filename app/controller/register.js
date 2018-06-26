'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async register(data) {
    await this.ctx.service.register.add(data);
    this.ctx.body = { data: 'hello' };
  }
}

module.exports = HomeController;
