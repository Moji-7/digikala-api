import { IsNumber } from 'class-validator';
import { Controller, Get, Query } from '@nestjs/common';
import { CommentsEntity } from './entity/comments.entity';
import { CommentsService } from './comments.service';



@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(
    @Query('productId') productId: number, 
  ): Promise<[CommentsEntity[], number]> {
    return this.commentsService.getComments(productId,1,3);
  }
}
