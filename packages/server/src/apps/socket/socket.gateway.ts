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

  endScraping(totalDocuments: number): void {
    this.server.emit('scraping-ended', { date: new Date(), totalDocuments });
  }
}
