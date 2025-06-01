import {
  Controller,
  Request,
  Post,
  UseGuards,
  Res,
  Query,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from 'src/cookie/cookie.service';
import { LocalAuthGuard } from 'src/common/guards/auth/local-auth.guard';
import { AuthRequest } from 'src/constants/interfaces/auth/auth.interface';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { access_token } = await this.authService.login(req.user.id);
    this.cookieService.setUserCookie(res, access_token);
    return { message: 'Logged in successfully' };
  }

  @Get('confirm')
  async confirmEmail(@Query('token') token: string) {
    console.log(token);

    await this.userService.confirmEmail(token);
    return { message: 'Email confirmed successfully' };
  }
}
