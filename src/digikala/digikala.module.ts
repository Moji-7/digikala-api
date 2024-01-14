import { Module } from '@nestjs/common';
import { DigikalaController } from './digikala.controller';
import { DigikalaService } from './digikala.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyService } from './proxy.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.digikala.com/v1',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [DigikalaController],
  providers: [DigikalaService,ProxyService],
})
export class DigikalaModule {}
