import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

// @WebSocketGateway({ cors: { origin: 'http://localhost:19006/' } })
@WebSocketGateway({ cors: { origin: '*' } }) 
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  @SubscribeMessage('connectClient')
  handleConnectClient(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    // Store client reference using a unique identifier, e.g., a user ID
    this.clients.set(data.clientId, client);
    console.log('hi hi');
  }

  getClientSocket(clientId: string): Socket | undefined {
    return this.clients.get(clientId);
  }

  @OnEvent('results.processed')
  async handleResultsProcessed(postData: any) {
    console.log('hello server')
    // Retrieve the client socket using the clientId from postData
    const clientSocket = this.getClientSocket(postData.clientId);
    if (clientSocket) {
      // Assuming postData contains the processed results
      clientSocket.emit('processedResults', postData);
    } else {
      console.error(`Client socket not found for clientId: ${postData.clientId}`);
    }
  }
}
