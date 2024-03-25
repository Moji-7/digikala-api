import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EyeProduct } from './EyeProduct.entity';
import { EyeProductParams } from './EyeProduct.dto';
import { QueryBuilder } from 'typeorm';
@Injectable()
export class EyeService {
  constructor(
    @InjectRepository(EyeProduct)
    private eyeProductRepository: Repository<EyeProduct>,
  ) {}

  async saveEyeProduct(eye: EyeProduct[]): Promise<EyeProduct[]> {
    return await this.eyeProductRepository.save(eye);
  }

  async getEyeProduct(
    params: EyeProductParams,
    userId: number,
  ): Promise<[EyeProduct[], number]> {
    const where =
      params.productId || params.productTitle
        ? {
            ...(params.productId && { productId: params.productId }),
            ...(params.productTitle && { productTitle: params.productTitle }),
            userId: userId,
          }
        : { userId: userId };

    return this.eyeProductRepository.findAndCount({
      where,
      order: { id: 'DESC' },
      skip: ((params.page ?? 1) - 1) * params.length ?? 10,
      take: params.length ?? 10,
    });
  }
  async delete(productId: number): Promise<{ success: boolean }> {
    const deleteResult: DeleteResult = await this.eyeProductRepository.delete({
      productId, // Assuming "productId" is the primary key or unique identifier
    });

    if (deleteResult.affected > 0) {
      return { success: true };
    } else {
      return { success: false }; // Provide clear feedback
    }
  }

  //with Query builder
  //   async getEyeProduct(params: EyeProductParams): Promise<[EyeProduct[], number]> {
  //     let query = this.eyeProductRepository.createQueryBuilder("EyeProduct");

  //     if (params.productId) {
  //       query = query.andWhere("EyeProduct.productId = :productId", { productId: params.productId });
  //     }

  //     if (params.productTitle) {
  //       query = query.andWhere("EyeProduct.productTitle = :productTitle", { productTitle: params.productTitle });
  //     }

  //     query = query.orderBy("EyeProduct.id", "DESC")
  //       .skip((params.page - 1) * params.length)
  //       .take(params.length);

  //     return await query.getManyAndCount();
  //   }
}
