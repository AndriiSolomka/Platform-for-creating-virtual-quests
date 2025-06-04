import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../utils/password/hash';
import { UserRepository } from './user.repository';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../common/exceptions/user.exceptions';
import { User } from '@prisma/client';
import { EmailConfirmTokenService } from '../email-confirm-token/email-confirm-token.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailConfirmTokenService: EmailConfirmTokenService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    await this.ensureUserNotExists(dto.email);
    const { password, ...userData } = dto;
    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = await this.emailConfirmTokenService.create(user.id);
    await this.emailService.sendConfirmationEmail(user.email, token);
  }

  async ensureUserNotExists(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new UserAlreadyExistsException(email);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundException(email);
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(`ID: ${id}`);
    return user;
  }

  async confirmEmail(token: string): Promise<void> {
    const userId = await this.emailConfirmTokenService.validate(token);
    await this.userRepository.update(userId, { isEmailConfirmed: true });
  }

  async deleteUnconfirmedUsers(): Promise<void> {
    await this.userRepository.deleteUnconfirmed();
  }

  async createByGoogle(profile: CreateUserDto) {
    const user = await this.userRepository.findByEmail(profile.email);
    if (!user) return await this.userRepository.create(profile);
    return user;
  }
}
