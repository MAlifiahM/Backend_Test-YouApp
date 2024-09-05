import { Schema, Document } from 'mongoose';

export const MessageSchema = new Schema({
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export interface Message extends Document {
  senderId: string;
  senderName: string;
  recipientId: string;
  message: string;
  timestamp: Date;
}
