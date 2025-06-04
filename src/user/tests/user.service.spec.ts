/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { EmailConfirmTokenService } from '../../email-confirm-token/email-confirm-token.service';
import { EmailService } from '../../email/email.service';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../../common/exceptions/user.exceptions';
import { hashPassword } from '../../utils/password/hash';

jest.mock('../../utils/password/hash', () => ({
  hashPassword: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: {
    findByEmail: jest.Mock;
    create: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
    deleteUnconfirmed: jest.Mock;
  };
  let emailConfirmTokenService: { create: jest.Mock; validate: jest.Mock };
  let emailService: { sendConfirmationEmail: jest.Mock };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteUnconfirmed: jest.fn(),
    };
    emailConfirmTokenService = {
      create: jest.fn(),
      validate: jest.fn(),
    };
    emailService = {
      sendConfirmationEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: userRepository },
        {
          provide: EmailConfirmTokenService,
          useValue: emailConfirmTokenService,
        },
        { provide: EmailService, useValue: emailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user, generate token, and send confirmation email', async () => {
      const dto = { email: 'test@mail.com', password: '123', name: 'Test' };
      userRepository.findByEmail.mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue('hashed');
      userRepository.create.mockResolvedValue({ id: 1, email: dto.email });
      emailConfirmTokenService.create.mockResolvedValue('token123');

      await service.create(dto as any);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(hashPassword).toHaveBeenCalledWith(dto.password);
      expect(userRepository.create).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
        password: 'hashed',
      });
      expect(emailConfirmTokenService.create).toHaveBeenCalledWith(1);
      expect(emailService.sendConfirmationEmail).toHaveBeenCalledWith(
        dto.email,
        'token123',
      );
    });

    it('should throw if user already exists', async () => {
      userRepository.findByEmail.mockResolvedValue({ id: 1 });
      await expect(
        service.create({ email: 'a', password: 'b' } as any),
      ).rejects.toThrow(UserAlreadyExistsException);
    });
  });

  describe('ensureUserNotExists', () => {
    it('should throw if user exists', async () => {
      userRepository.findByEmail.mockResolvedValue({ id: 1 });
      await expect(service.ensureUserNotExists('mail')).rejects.toThrow(
        UserAlreadyExistsException,
      );
    });

    it('should resolve if user does not exist', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      await expect(
        service.ensureUserNotExists('mail'),
      ).resolves.toBeUndefined();
    });
  });

  describe('findOneByEmail', () => {
    it('should return user if found', async () => {
      const user = { id: 2, email: 'e' };
      userRepository.findByEmail.mockResolvedValue(user);
      await expect(service.findOneByEmail('e')).resolves.toBe(user);
    });

    it('should throw if user not found', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      await expect(service.findOneByEmail('e')).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('findOneById', () => {
    it('should return user if found', async () => {
      const user = { id: 3, email: 'e' };
      userRepository.findById.mockResolvedValue(user);
      await expect(service.findOneById(3)).resolves.toBe(user);
    });

    it('should throw if user not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      await expect(service.findOneById(3)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('confirmEmail', () => {
    it('should validate token and update user', async () => {
      emailConfirmTokenService.validate.mockResolvedValue(5);
      userRepository.update.mockResolvedValue(undefined);

      await service.confirmEmail('token');
      expect(emailConfirmTokenService.validate).toHaveBeenCalledWith('token');
      expect(userRepository.update).toHaveBeenCalledWith(5, {
        isEmailConfirmed: true,
      });
    });
  });

  describe('deleteUnconfirmedUsers', () => {
    it('should call userRepository.deleteUnconfirmed', async () => {
      userRepository.deleteUnconfirmed.mockResolvedValue(undefined);
      await service.deleteUnconfirmedUsers();
      expect(userRepository.deleteUnconfirmed).toHaveBeenCalled();
    });
  });

  describe('createByGoogle', () => {
    it('should create user if not exists', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue({ id: 10, email: 'g' });
      const profile = { email: 'g', name: 'n' } as any;
      const result = await service.createByGoogle(profile);
      expect(userRepository.create).toHaveBeenCalledWith(profile);
      expect(result).toEqual({ id: 10, email: 'g' });
    });

    it('should return user if exists', async () => {
      const user = { id: 11, email: 'g' };
      userRepository.findByEmail.mockResolvedValue(user);
      const profile = { email: 'g', name: 'n' } as any;
      const result = await service.createByGoogle(profile);
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });
});
