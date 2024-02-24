
import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TokenInterceptor } from './token.interceptor';

@Global()
@Module({
  //providers: [TokenService],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor,
    },
    TokenService
  ],
  exports: [TokenService],
})
export class TokenModule {}

