import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from '../../src/chat/chat.controller';
import { ChatService } from '../../src/chat/chat.service';

jest.mock('../../src/chat/chat.service');

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService],
    }).compile();

    chatController = app.get<ChatController>(ChatController);
    chatService = app.get<ChatService>(ChatService);
  });

  describe('sendMessage', () => {
    it('should return a success message', async () => {
      const result = {
        success: true,
        message: 'Message sent successfully',
      };
      const chatSpy = jest.spyOn(chatService, 'sendMessage');
      chatSpy.mockImplementation(() => Promise.resolve());
      const res = await chatController.sendMessage(
        { user: { userId: 'user1', username: 'name1' } },
        { recipientId: 'user2', message: 'hello' },
      );
      expect(res).toEqual(result);
      expect(chatSpy).toBeCalledTimes(1);
    });
  });

  describe('viewMessages', () => {
    it('should return an array of messages', async () => {
      const result = [];
      const chatSpy = jest.spyOn(chatService, 'getMessages');
      chatSpy.mockImplementation(() => Promise.resolve(result));
      const res = await chatController.viewMessages({
        query: { recipientId: 'user1' },
      });
      expect(res).toEqual(result);
      expect(chatSpy).toBeCalledTimes(1);
    });
  });
});
