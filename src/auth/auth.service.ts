import { Injectable } from '@nestjs/common';
import { UserSafe } from 'src/constants/types/user/user.type';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { UserService } from 'src/user/user.service';
import { validatePassword } from 'src/utils/password/hash';

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
}
