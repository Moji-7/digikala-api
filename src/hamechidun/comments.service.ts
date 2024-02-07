
// comments Service in Nest.js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from './entity/comments.entity';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) {}

  async findAll(): Promise<CommentsEntity[]> {
    return this.commentsRepository.find();
  }

  async getComments(productId: number, page: number, length: number): Promise<[CommentsEntity[], number]> {
    return this.commentsRepository.findAndCount({
      where: productId ? { product_id: productId } : {},
      order: { id: 'DESC' },
      skip: (page - 1) * length,
      take: length
    });
  }
  
}
