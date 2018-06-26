'use strict';

module.exports = app => {
  const { STRING, INTEGER, UUID } = app.Sequelize;
  const Word = app.model.define('word', {
    id: { type: UUID, primaryKey: true, defaultValue: UUID },
    name: { type: STRING, allowNull: false },
    type: { type: INTEGER, allowNull: false },
    level: { type: INTEGER, allowNull: false },
  });

  Word.associate = function() {
    app.model.Word.hasMany(app.model.Translate, { as: 'translates', foreignKey: 'word_id' });
  };

  return Word;
};
