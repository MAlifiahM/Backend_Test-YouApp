import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(
    @Body() body: { username: string; password: string; email: string },
  ) {
    await this.authService.register(body.username, body.password, body.email);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async login(
    @Body() body: { username: string; email: string; password: string },
    @Res() res: Response,
  ) {
    const token = await this.authService.login(
      body.username,
      body.email,
      body.password,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return res.status(200).json({ token });
  }
}
