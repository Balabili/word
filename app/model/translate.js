'use strict';

module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV1 } = app.Sequelize;
  const Translate = app.model.define('translate', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV1 },
    // 词性
    type: { type: INTEGER, allowNull: false },
    // 翻译
    value: { type: STRING, allowNull: false },
    // 例句
    example: STRING,
    word_id: { type: UUID, allowNull: false },
  });

  Translate.associate = function () {
    app.model.Translate.belongsTo(app.model.Word, { as: 'words', foreignKey: 'word_id' });
  };

  return Translate;
};
