const  createProxyMiddleware  = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://front-profes.vercel.app/',
      changeOrigin: true,
    })
  );
};