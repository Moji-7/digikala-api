import { Injectable } from '@nestjs/common';

@Injectable()
export class PipelineService {
  async getPipelineById(pipelineID: string) {
    // Add your logic here to fetch and return the pipeline by ID
    return `Fetching pipeline with ID ${pipelineID}`;
  }
}
