import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust this to the actual origin of your frontend app
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Record<string, string> = {}; // Maps socketId to userId

  // Handle connection event
  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  // Handle disconnection event
  handleDisconnect(socket: Socket) {
    const userId = this.users[socket.id];
    console.log(`Client disconnected: ${socket.id}, UserId: ${userId}`);
    delete this.users[socket.id];
  }

  // Event to listen for a new message
  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    payload: { senderName: string; recipientId: string; message: string },
  ): void {
    const { senderName, recipientId, message } = payload;
    // Broadcast the message to all clients
    this.server.emit('messageReceived', {
      senderName,
      recipientId,
      message,
    });
  }

  // Event to register userId on connection
  @SubscribeMessage('registerUser')
  handleRegister(client: Socket, payload: { userId: string }) {
    const { userId } = payload;
    this.users[client.id] = userId;
    console.log(`User registered with ID: ${userId}`);
  }
}
