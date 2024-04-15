import { Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

//@WebSocketGateway()
@WebSocketGateway({ cors: { origin: 'http://localhost:19006' } }) 
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect , OnModuleInit 
{
   @WebSocketServer() io: Server;
  private readonly logger = new Logger(NotificationGateway.name);
  constructor(private eventEmitter: EventEmitter2) {}
  
  
  onModuleInit() {
    this.eventEmitter.on('published_from_NestToSocket_pipelineStatus', (data: any) => {
      console.log('Step 4 ==>from Nest to Client;'+ JSON.stringify(data) +"***Socket***")
      // Emit the data to all connected WebSocket clients
      this.io.emit('published_from_SocketToClient_pipelineStatus', data);
    });
  }


  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    return {
      event: 'pong',
      data,
    };
  }
  @SubscribeMessage('processed_and_Published_by_python')
  handleProcessedResults(client: any, data: any) {
    this.logger.log(`processed_and_Published_by_pythonreceived: ${data}`);
    // Emitting a message back to the client
    this.io.to(client.id).emit('notify_clinet_for_processed', data);
  }
}
