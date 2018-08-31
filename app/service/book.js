'use strict';

const Service = require('egg').Service;
const { generateUUID } = require('../util/utils');

class BookService extends Service {
  async getNewWordBookList() {
    return await this.app.mysql.select('books', { where: { type: 1 } });
  }

  async getErrorWordBookList() {
    return await this.app.mysql.select('books', { where: { type: 2 } });
  }

  async addBook({ type, name, userId }) {
    await this.app.mysql.insert('books', {
      id: generateUUID(), type, name, user_id: userId,
    });
  }

  async updateBook({ id, name }) {
    await this.app.mysql.update('books', { name }, { where: { id } });
  }

  async deleteBook(id) {
    await this.app.mysql.delete('books', { id });
  }

  async getBookById(id) {
    return await this.app.mysql.select('books', { where: { id } });
  }
}

module.exports = BookService;
