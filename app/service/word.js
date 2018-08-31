'use strict';

const Service = require('egg').Service;
const { generateUUID } = require('../util/utils');

class WordService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Word = this.ctx.model.Word;
    this.Translate = this.ctx.model.Translate;
  }

  async getList({ current, pageSize, key, keyWord }) {
    const queryString = 'select * from words';
    const quertResult = await this.app.mysql.query(queryString);
  }

  async addWord(data) {
    const wordId = generateUUID();
    const date = new Date().toLocaleString();
    const conn = await this.app.mysql.beginTransaction();
    try {
      const { alias, romaji, level, translate } = data.translate;
      await conn.insert('words', {
        id: wordId,
        alias,
        romaji,
        level,
        created_at: date,
        updated_at: date,
      });
      for (let i = 0; i < translate.length; i++) {
        const transId = generateUUID();
        const { type, value, example } = translate[i];
        await conn.insert('translates', {
          id: transId,
          type, value, example,
          word_id: wordId,
        });
      }
      await conn.commit();
      return { success: true };
    } catch (error) {
      await conn.rollback();
      return { success: false, message: error };
    }
  }

  async updateWord(data) {
    const { id, alias, romaji, level, translate } = data.translate;
    const date = new Date().toLocaleString();
    const conn = await this.app.mysql.beginTransaction();
    try {
      await conn.update('words', {
        alias, romaji, level,
        updated_at: date,
      }, { where: { id } });
      await conn.delete('translates', { word_id: id });
      for (let i = 0; i < translate.length; i++) {
        const transId = generateUUID();
        const { type, value, example } = translate[i];
        await conn.insert('translates', {
          id: transId,
          type, value, example,
          word_id: id,
        });
      }
      await conn.commit();
      return { success: true };
    } catch (error) {
      await conn.rollback();
      return { success: false, message: error };
    }
  }

  async deleteWord(id) {
    const mysql = this.app.mysql;
    const date = new Date().toLocaleString();
    const conn = await mysql.beginTransaction();
    try {
      const trans = mysql.select('translates', { where: { word_id: id } });
      await mysql.delete('words', { id });
    } catch (error) {

    }
  }

  getWordsByBookId(id) { }
}

module.exports = WordService;
