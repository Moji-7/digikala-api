import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  EyeProduct } from './EyeProduct.entity';
import { EyeController } from './eye.controller';
import { EyeService } from './eye.service';

@Module({
  imports: [TypeOrmModule.forFeature([EyeProduct])],
  controllers: [EyeController],
  providers: [EyeService],
})
export class EyeModule {}