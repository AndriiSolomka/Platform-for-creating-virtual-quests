import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { EmailConfirmTokenModule } from '../email-confirm-token/email-confirm-token.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailConfirmTokenModule, EmailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
