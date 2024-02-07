import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsDataset } from '../entity/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProccessedService {
  constructor(
    @InjectRepository(CommentsDataset)
    private commentsDatasetRepository: Repository<CommentsDataset>,
  ) {}

  async getCommentsDataset(
    productId: number,
    page: number,
    length: number,
  ): Promise<[CommentsDataset[], number]> {
    return this.commentsDatasetRepository.findAndCount({
      where: productId ? { product_id: productId } : {},
      order: { id: 'DESC' },
      skip: (page - 1) * length,
      take: length,
    });
  }
}
