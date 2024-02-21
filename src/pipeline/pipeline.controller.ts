import { Controller, Get, Param } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { delay } from 'src/utility/delay';
import { TokenService } from 'src/token/token.service';

@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly pipelineService: PipelineService
    ) {}

  @Get(':pipelineID')
  async getPipelineById(@Param('pipelineID') pipelineID: string) {
    const token = this.tokenService.getToken();
    console.log(token.userId)
    try {
      await delay(Math.floor(Math.random() * 3) + 1, true); // Wait for 3 seconds with resultStatus as true
      return this.pipelineService.getPipelineById(pipelineID);
    } catch (error) {
      return error.message;
    }
  }
}
