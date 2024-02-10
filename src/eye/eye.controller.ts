import { Body, Controller, Post } from '@nestjs/common';
import { EyeProduct } from './Eye.entity';
import { EyeService } from './eye.service';

@Controller('eye')
export class EyeController {
  constructor(private readonly eyeService: EyeService) {}

  @Post('EyeProduct')
  async create(@Body() eye: EyeProduct): Promise<EyeProduct> {
    return await this.eyeService.saveEyeProduct(eye);
  }
}