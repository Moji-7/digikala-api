import { IsNumber } from 'class-validator';
import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CommentsEntity } from './entity/comments.entity';
import { CommentsService } from './comments.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiQuery({ name: 'productId', type: Number, description: 'The ID of the product' })
  @ApiResponse({ status: 200, type: CommentsEntity, description: 'Returns the list of comments and the total count' })
  async getComments(
    @Query('productId') productId: number): Promise<{ comments: CommentsEntity[]; count: number }> {
      
      try {
    const [comments, count] = await this.commentsService.getComments(
      productId,
      1,
      20,
    );
    return { comments, count };

  } catch (error) {
    // Handle errors and return appropriate status codes
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}
