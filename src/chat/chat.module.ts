import { Module, OnModuleInit } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.stategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Server } from 'socket.io';
import { MessageSchema } from './message.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService, JwtStrategy, JwtAuthGuard],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule implements OnModuleInit {
  private server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    // Initialize Socket.IO server
    this.server = new Server();
    this.chatService.setSocketServer(this.server);

    // Setup Socket.IO connection handler
    this.server.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('sendMessage', (data) => {
        this.chatService.sendMessage(
          data.senderId,
          data.senderName,
          data.recipientId,
          data.message,
        );
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}
