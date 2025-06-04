import { Injectable } from '@nestjs/common';
import { EmailConfirmException } from 'src/common/exceptions/user.exceptions';
import { GoogleUser } from 'src/constants/interfaces/auth/auth.interface';
import { UserSafe } from '../constants/types/user/user.type';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { UserService } from '../user/user.service';
import { validatePassword } from '../utils/password/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: CustomJwtService,
  ) {}

  async login(user_id: number): Promise<{ access_token: string }> {
    const token = await this.jwtService.sign(user_id);
    return { access_token: token };
  }

  async validateUser(email: string, password: string): Promise<UserSafe> {
    const user = await this.userService.findOneByEmail(email);
    if (validatePassword(password, user.password)) {
      // you can choose to exclude the password field from the result
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(profile: GoogleUser) {
    if (!profile.is_email_confirm) throw new EmailConfirmException();
    return await this.userService.createByGoogle(profile);
  }
}
