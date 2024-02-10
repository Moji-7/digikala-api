import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EyeProduct } from './Eye.entity';

@Injectable()
export class EyeService {
  constructor(
    @InjectRepository(EyeProduct)
    private eyeProductRepository: Repository<EyeProduct>,
  ) {}

  async saveEyeProduct(eye: EyeProduct): Promise<EyeProduct> {
    return await this.eyeProductRepository.save(eye);
  }
}