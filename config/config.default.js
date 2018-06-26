'use strict';

// const database = 'egg';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529461074502_9871';

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'Sxc123#',
      database: 'egg',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'egg',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'Sxc123#',
  };

  // add your config here
  config.middleware = [];

  return config;
};
