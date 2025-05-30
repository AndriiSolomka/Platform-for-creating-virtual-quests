import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/password/hash';
import { UserRepository } from './user.repository';
import { UserAlreadyExistsException } from 'src/common/exception/user.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<string> {
    await this.ensureUserNotExists(dto.email);

    const { password, ...userData } = dto;
    const hashedPassword = await hashPassword(password);

    await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return `User "${dto.name}" created successfully`;
  }

  private async ensureUserNotExists(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new UserAlreadyExistsException(email);
  }
}
