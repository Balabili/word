'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/register', controller.register.register);
  // router.get('/', controller.home.index);
};
