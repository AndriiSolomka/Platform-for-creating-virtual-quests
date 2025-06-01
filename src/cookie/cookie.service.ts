import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { COOKIE } from 'src/constants/enum/cookie/cookie.enum';

@Injectable()
export class CookieService {
  setUserCookie(res: Response, token: string): void {
    res.cookie(COOKIE.TYPE, token, {
      httpOnly: true,
      secure: false,
      sameSite: COOKIE.SAME_SITE,
      maxAge: Number(COOKIE.MAX_AGE),
    });
  }
}
