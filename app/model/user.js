'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: UUID, primaryKey: true, defaultValue: UUID },
    email: STRING,
    login: { type: STRING, allowNull: false },
    password: { type: STRING(32), allowNull: false },
    role: { type: INTEGER, allowNull: false, defaultValue: 2 },
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.prototype.logSignin = async function () {
    await this.update({ last_sign_in_at: new Date() });
  };

  return User;
};
