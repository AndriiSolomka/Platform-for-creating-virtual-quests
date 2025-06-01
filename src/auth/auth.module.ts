import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { CustomJwtModule } from 'src/custom-jwt/custom-jwt.module';
import { AuthController } from './auth.controller';
import { CookieModule } from 'src/cookie/cookie.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, CustomJwtModule, CookieModule, UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
