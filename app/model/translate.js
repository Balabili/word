'use strict';

module.exports = app => {
  const { STRING, INTEGER, UUID } = app.Sequelize;
  const Translate = app.model.define('translate', {
    id: { type: UUID, primaryKey: true, defaultValue: UUID },
    type: { type: INTEGER, allowNull: false },
    value: { type: STRING, allowNull: false },
    example: STRING,
    word_id: { type: UUID, allowNull: false },
  });

  Translate.associate = function () {
    app.model.Translate.belongsTo(app.model.Word, { as: 'words', foreignKey: 'word_id' });
  };

  return Translate;
};
