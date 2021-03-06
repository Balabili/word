'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1 } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV1 },
    email: { type: STRING, allowNull: false, validate: { isEmail: true } },
    login: { type: STRING, allowNull: false },
    password: { type: STRING(32), allowNull: false },
    role: { type: INTEGER, allowNull: false, defaultValue: 2 },
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function () {
    app.model.User.hasMany(app.model.Book, { as: 'newWordLists', foreignKey: 'user_id' });
  };

  User.prototype.logSignin = async function () {
    await this.update({ last_sign_in_at: new Date() });
  };

  return User;
};
