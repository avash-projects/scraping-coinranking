import {
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  startScraping(): void {
    this.server.emit('scraping-started', new Date());
  }

  endScraping(): void {
    this.server.emit('scraping-ended', new Date());
  }
}
