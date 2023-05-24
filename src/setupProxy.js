import { BACKEND_HOST } from './constant';

const  {createProxyMiddleware}  = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use(
    
//     createProxyMiddleware('/',{
//       target: 'https://new-prof.onrender.com',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/': '', // Remove the leading forward slash from the request path
//       },
//     })
//   );
//   console.log("proxy calling");
// };

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://new-prof.onrender.com',
      changeOrigin: true,
    })
  );
};