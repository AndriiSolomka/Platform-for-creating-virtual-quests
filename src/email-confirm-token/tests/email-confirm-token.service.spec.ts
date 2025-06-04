/* eslint-disable */
import { EmailConfirmTokenService } from '../email-confirm-token.service';
import { EmailConfirmTokenRepository } from '../email-confirm-token.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

jest.mock('../../utils/token/token', () => ({
  generateToken: jest.fn(() => 'mocked-token'),
}));

describe('EmailConfirmTokenService', () => {
  let service: EmailConfirmTokenService;
  let repository: jest.Mocked<EmailConfirmTokenRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findByToken: jest.fn(),
      delete: jest.fn(),
    } as any;
    service = new EmailConfirmTokenService(repository);
  });

  describe('create', () => {
    it('should generate a token, save it and return it', async () => {
      const userId = 1;
      const token = await service.create(userId);

      expect(token).toBe('mocked-token');
      expect(repository.create).toHaveBeenCalledWith(
        userId,
        'mocked-token',
        expect.any(Date),
      );
    });
  });

  describe('validate', () => {
    it('should throw NotFoundException if token not found', async () => {
      repository.findByToken.mockResolvedValue(null);

      await expect(service.validate('not-exist')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if token expired', async () => {
      const expiredDate = new Date(Date.now() - 1000);
      repository.findByToken.mockResolvedValue({
        id: 123,
        token: 'expired-token',
        userId: 2,
        expiresAt: expiredDate,
        createdAt: new Date(),
      });
      repository.delete.mockResolvedValue(undefined);

      await expect(service.validate('expired-token')).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.delete).toHaveBeenCalledWith('expired-token');
    });

    it('should return userId if token is valid', async () => {
      const validDate = new Date(Date.now() + 10000);
      repository.findByToken.mockResolvedValue({
        id: 1,
        token: 'valid-token',
        userId: 3,
        expiresAt: validDate,
        createdAt: new Date(),
      });

      const userId = await service.validate('valid-token');
      expect(userId).toBe(3);
    });
  });

  describe('consume', () => {
    it('should delete the token', async () => {
      repository.delete.mockResolvedValue(undefined);

      await service.consume('some-token');
      expect(repository.delete).toHaveBeenCalledWith('some-token');
    });
  });
});
