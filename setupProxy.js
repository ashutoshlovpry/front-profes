import { BACKEND_HOST } from './src/constant';

const  {createProxyMiddleware}  = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'https://new-prof.onrender.com',
      changeOrigin: true,
    })
  );
};