import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: { origin: '*' } }) // Angular port
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  // Implement other Socket.IO event handlers and message handlers
  @SubscribeMessage('myEvent')
  @SubscribeMessage('connectClient')
  handleMyEvent(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    console.log('hi hi');
    // Handle 'myEvent' here
  }
}
