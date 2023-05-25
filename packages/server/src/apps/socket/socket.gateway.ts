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

  // @SubscribeMessage('newProduct')
  startScraping(): void {
    // Emit the 'newProduct' event to all connected clients
    this.server.emit('scraping-started', new Date());
  }

  endScraping(): void {
    // Emit the 'newProduct' event to all connected clients
    this.server.emit('scraping-ended', new Date());
  }

  // @SubscribeMessage('scrapingStarted')
  // handleScrapingStarted(client: any, payload: boolean) {
  //   this.server.emit('scrapingStarted', payload);
  // }

  // @SubscribeMessage('numberOfResults')
  // handleNumberOfResults(client: any, payload: string) {
  //   this.server.emit('numberOfResults', payload);
  // }
}
