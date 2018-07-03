'use strict';

module.exports = app => {
  const { STRING, UUID } = app.Sequelize;
  const NewWordList = app.model.define('new_word_list', {
    id: { type: UUID, primaryKey: true, defaultValue: UUID },
    name: { type: STRING, allowNull: false },
    user_id: { type: UUID, defaultValue: UUID, allowNull: false },
    word_id: { type: UUID, defaultValue: UUID },
  });

  NewWordList.associate = function () {
    app.model.NewWordList.belongsTo(app.model.User, { as: 'users', foreignKey: 'user_id' });
    app.model.NewWordList.belongsToMany(app.model.Word, { as: 'words', through: 'word_new_word_list', foreignKey: 'new_word_id' });
  };

  return NewWordList;
};
