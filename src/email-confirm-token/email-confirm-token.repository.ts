import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailConfirmTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, token: string, expiresAt: Date): Promise<void> {
    await this.prisma.emailConfirmToken.create({
      data: { userId, token, expiresAt },
    });
  }
  async findByToken(token: string) {
    return this.prisma.emailConfirmToken.findUnique({
      where: { token },
    });
  }

  async delete(token: string): Promise<void> {
    await this.prisma.emailConfirmToken.delete({
      where: { token },
    });
  }
}
