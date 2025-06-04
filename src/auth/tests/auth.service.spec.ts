import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { CustomJwtService } from '../../custom-jwt/custom-jwt.service';
import { validatePassword } from '../../utils/password/hash';

jest.mock('../../utils/password/hash', () => ({
  validatePassword: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: { findOneByEmail: jest.Mock };
  let customJwtService: { sign: jest.Mock };

  beforeEach(async () => {
    userService = { findOneByEmail: jest.fn() };
    customJwtService = { sign: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: CustomJwtService, useValue: customJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token', async () => {
      customJwtService.sign.mockReturnValue('signed-token');
      const result = await service.login(123);
      expect(customJwtService.sign).toHaveBeenCalledWith(123);
      expect(result).toEqual({ access_token: 'signed-token' });
    });
  });

  describe('validateUser', () => {
    it('should return user without password if password is valid', async () => {
      const user = { id: 1, email: 'test@mail.com', password: 'hashed' };
      userService.findOneByEmail.mockResolvedValue(user);
      (validatePassword as jest.Mock).mockReturnValue(true);

      const result = await service.validateUser('test@mail.com', 'pass');
      expect(userService.findOneByEmail).toHaveBeenCalledWith('test@mail.com');
      expect(validatePassword).toHaveBeenCalledWith('pass', 'hashed');
      expect(result).toEqual({ id: 1, email: 'test@mail.com' });
    });

    it('should return null if password is invalid', async () => {
      const user = { id: 1, email: 'test@mail.com', password: 'hashed' };
      userService.findOneByEmail.mockResolvedValue(user);
      (validatePassword as jest.Mock).mockReturnValue(false);

      const result = await service.validateUser('test@mail.com', 'wrong');
      expect(result).toBeNull();
    });
  });
});
