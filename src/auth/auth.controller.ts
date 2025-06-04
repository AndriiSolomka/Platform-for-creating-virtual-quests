import { Controller, Post, UseGuards, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieService } from '../cookie/cookie.service';
import { LocalAuthGuard } from 'src/common/guards/auth/local-auth.guard';
import { UserService } from '../user/user.service';
import { GoogleAuthGuard } from '../common/guards/auth/google-auth.guard';
import {
  Auth,
  AuthRequestParams,
} from '../common/decorators/auth-request.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Auth() { req, res }: AuthRequestParams) {
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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth(): { message: string } {
    return { message: 'Redirect to Google...' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Auth() { req, res }: AuthRequestParams) {
    console.log('req.user', req.user);

    const { access_token } = await this.authService.login(req.user.id);
    this.cookieService.setUserCookie(res, access_token);
    return { message: 'Logged in with Google successfully' };
  }
}
