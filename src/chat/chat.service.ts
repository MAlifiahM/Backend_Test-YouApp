import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message as MessageInterface } from './message.schema';
import { Server } from 'socket.io';

@Injectable()
export class ChatService {
  private server: Server;

  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageInterface>,
  ) {}

  setSocketServer(server: Server) {
    this.server = server;
  }

  async sendMessage(
    senderId: string,
    senderName: string,
    recipientId: string,
    message: string,
  ): Promise<void> {
    const newMessage = new this.messageModel({
      senderId,
      senderName,
      recipientId,
      message,
      timestamp: new Date(),
    });
    await newMessage.save();

    // Emit message to recipient
    this.server.emit('messageReceived', {
      senderId,
      senderName,
      recipientId,
      message,
      timestamp: newMessage.timestamp,
    });
  }

  async getMessages(userId: string): Promise<MessageInterface[]> {
    return this.messageModel.find({ recipientId: userId }).exec();
  }
}
