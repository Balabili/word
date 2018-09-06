'use strict';

module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV1 } = app.Sequelize;
  const Word = app.model.define('word', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV1 },
    // 假名
    kana: { type: STRING, allowNull: false },
    // 罗马字
    romaji: { type: STRING, allowNull: false },
    // 等级N0-N5
    level: { type: INTEGER, allowNull: false },
  });

  Word.associate = function () {
    app.model.Word.hasMany(app.model.Translate, { as: 'translates', foreignKey: 'word_id' });
    app.model.Word.belongsToMany(app.model.Book, { as: 'newWordLists', through: 'word_book_list', foreignKey: 'word_id' });
  };

  return Word;
};
