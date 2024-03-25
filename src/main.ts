import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
//import * as proxy from 'http-proxy-middleware';

async function bootstrap() {
  // Create the HTTP application
  const app = await NestFactory.create(AppModule, { cors: true });
app.enableCors();
  // Create the microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: '127.0.0.1',
      port: 6379,
    },
  });

  // Start the microservice
  await app.startAllMicroservices();

  // Start listening for HTTP requests
  await app.listen(3222);
}

bootstrap();
