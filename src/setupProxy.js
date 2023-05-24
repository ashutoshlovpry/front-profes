import { BACKEND_HOST } from './constant';

const  {createProxyMiddleware}  = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: 'https://new-prof.onrender.com',
      changeOrigin: true,
    })
  );
};