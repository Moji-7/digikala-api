import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as proxy from 'http-proxy-middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});

  // app.use(
  //   '/api/v1/todos-api',
  //   proxy.createProxyMiddleware({
  //     target: 'http://localhost:8090/api',
  //     pathRewrite: {
  //       '/api/v1/todos-api': '',
  //     },
  //     secure: false,
  //     onProxyReq: (proxyReq, req, res) => {
  //       console.log(
  //         ` [Global Functional Middlware]: Proxying ${req} request originally made to '${req}'...`,
  //       );
  //     },
  //   }),
  // );

  await app.listen(3222);
}
bootstrap();
