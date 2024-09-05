import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  @ApiOperation({ summary: 'Send message' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async sendMessage(
    @Req() req,
    @Body() body: { recipientId: string; message: string },
  ) {
    const senderId = req.user.userId;
    const senderName = req.user.username;
    const { recipientId, message } = body;
    await this.chatService.sendMessage(
      senderId,
      senderName,
      recipientId,
      message,
    );
    return { success: true, message: 'Message sent successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  @ApiOperation({ summary: 'View messages' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async viewMessages(@Req() req) {
    const userId = req.query.recipientId;
    return this.chatService.getMessages(userId);
  }
}
