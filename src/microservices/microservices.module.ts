// microservices.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_CLIENT',
        transport: Transport.REDIS,
        options: {
            host: '127.0.0.1',
            port: 6379
        },
      },
    ]),
  ],
  providers: [],
})
export class MicroservicesModule {}
