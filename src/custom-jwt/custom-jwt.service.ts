import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(user_id: number): Promise<string> {
    const payload = { user_id, sub: user_id };
    return this.jwtService.signAsync(payload);
  }
}
