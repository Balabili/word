'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
  async getList() {
    const result = await this.ctx.service.word.getList();
  }

}

module.exports = WordController;
