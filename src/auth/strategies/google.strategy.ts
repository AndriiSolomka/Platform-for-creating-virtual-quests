/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { hashPassword } from 'src/utils/password/hash';
import { ConfigService } from '@nestjs/config';
import { GoogleProfile } from 'src/constants/interfaces/auth/auth.interface';
import { generateToken } from 'src/utils/token/token';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    const user = {
      email: profile.emails[0]?.value,
      name: profile.displayName,
      password: await hashPassword(generateToken()),
      is_email_confirm: profile.emails[0]?.verified ?? false,
    };
    const validateUser = await this.authService.validateGoogleUser(user);
    done(null, validateUser);
  }
}
