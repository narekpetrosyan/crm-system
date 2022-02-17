const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://test5.365traveling.com',
      changeOrigin: true,
    }),
  );
};
