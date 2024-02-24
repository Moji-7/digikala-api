import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
//import { ProxyService } from './proxy.service';
//import { ProxyModule } from './proxy.module';
import { DigikalaModule } from './digikala/digikala.module';
 import { MyCacheModule } from './myCache/myCache.module'; 
import { HamechidunModule } from './hamechidun/hamechidun.module';
import { EyeModule } from './eye/eye.module';
import { AuthService } from './AuthService';
import { HttpServiceAuthInterceptor } from './AuthInterceptor';
import { TokenModule } from './token/token.module';
import { PipelineModule } from './pipeline/pipeline.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'digikala',
      entities: [__dirname + '/**/*.entity*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      //  logging: true, // Enable query logging
    }),
    
    DigikalaModule,
    //MyCacheModule,
    HamechidunModule,
    EyeModule,
    TokenModule,
    PipelineModule   
  ],
  controllers: [],
  providers: [],
  exports: [], 
 // controllers: [AppController],
 // providers: [AppService],
})
export class AppModule {}
