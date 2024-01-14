import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Define the proxy options
const options = {
  target: 'https://api.digikala.com', // The target server to proxy to
  changeOrigin: true, // Change the origin header to match the target server
  pathRewrite: {
    '^/api': '', // Remove the /api prefix from the request path
  },
};

// Create the proxy middleware
const proxy = createProxyMiddleware(options);

// @Module({})
// export class ProxyModule {
//   configure(consumer: MiddlewareConsumer) {
//     // Register the proxy middleware for all /api routes
//     consumer.apply(proxy).forRoutes({ path: '/api/*', method: RequestMethod.ALL });
//   }
// }
