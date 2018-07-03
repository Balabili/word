'use strict';

module.exports = app => {
  const { STRING, INTEGER, UUID } = app.Sequelize;
  const Word = app.model.define('word', {
    id: { type: UUID, primaryKey: true, defaultValue: UUID },
    alias: { type: STRING, allowNull: false },
    romaji: { type: STRING, allowNull: false },
    type: { type: INTEGER, allowNull: false },
    level: { type: INTEGER, allowNull: false },
    new_word_id: { type: UUID, defaultValue: UUID },
  });

  Word.associate = function () {
    app.model.Word.hasMany(app.model.Translate, { as: 'translates', foreignKey: 'word_id' });
    app.model.Word.belongsToMany(app.model.NewWordList, { as: 'newWordLists', through: 'word_new_word_list', foreignKey: 'word_id' });
  };

  return Word;
};
