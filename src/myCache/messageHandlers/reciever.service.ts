// message-handler.service.ts

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class MessageReciverService {
  constructor(private httpService: HttpService) {}

  @OnEvent('results.processed2')
  async handleResultsProcessed(postData: any) {
    // Logic to call the webhook
    const webhookUrl = 'http://localhost:3222/eye/?page=1&length=10&productId=123'; //data.webhookUrl; // The webhook URL provided by the client
    try {
      this.httpService.get(webhookUrl, postData).subscribe((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error.message)
      // Implement retry logic or error handling here
    }
  }
}
