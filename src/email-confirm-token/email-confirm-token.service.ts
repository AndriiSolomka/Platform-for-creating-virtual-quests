import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateToken } from '../utils/token/token';
import { EmailConfirmTokenRepository } from './email-confirm-token.repository';
import { TIMES } from '../constants/enum/email-confirm/token.enum';

@Injectable()
export class EmailConfirmTokenService {
  constructor(private readonly repository: EmailConfirmTokenRepository) {}

  async create(userId: number): Promise<string> {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + TIMES.FIVE_MINUTES_MS);
    await this.repository.create(userId, token, expiresAt);
    return token;
  }

  async validate(token: string): Promise<number> {
    const tokenRecord = await this.repository.findByToken(token);
    if (!tokenRecord) throw new NotFoundException('Token not found');

    if (tokenRecord.expiresAt < new Date()) {
      await this.repository.delete(token);
      throw new BadRequestException('Token expired');
    }

    return tokenRecord.userId;
  }

  async consume(token: string): Promise<void> {
    await this.repository.delete(token);
  }
}
