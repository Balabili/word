'use strict';

module.exports = app => {
  const { STRING, UUID, UUIDV1 } = app.Sequelize;
  const Book = app.model.define('books', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV1 },
    name: { type: STRING, allowNull: false },
    user_id: { type: UUID, allowNull: false },
  });

  Book.associate = function () {
    app.model.Book.belongsTo(app.model.User, { as: 'users', foreignKey: 'user_id' });
    app.model.Book.belongsToMany(app.model.Word, { as: 'words', through: 'word_book_list', foreignKey: 'book_id' });
  };

  return Book;
};
