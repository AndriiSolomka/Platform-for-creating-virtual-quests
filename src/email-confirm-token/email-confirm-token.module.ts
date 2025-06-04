import { Module } from '@nestjs/common';
import { EmailConfirmTokenService } from './email-confirm-token.service';
import { EmailConfirmTokenRepository } from './email-confirm-token.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmailConfirmTokenService, EmailConfirmTokenRepository],
  exports: [EmailConfirmTokenService],
})
export class EmailConfirmTokenModule {}
