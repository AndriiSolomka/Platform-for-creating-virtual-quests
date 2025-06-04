/* eslint-disable */
import { CustomJwtService } from '../custom-jwt.service';
import { JwtService } from '@nestjs/jwt';

describe('CustomJwtService', () => {
  let customJwtService: CustomJwtService;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    jwtService = {
      signAsync: jest.fn(),
    } as any;
    customJwtService = new CustomJwtService(jwtService);
  });

  it('should call jwtService.signAsync with correct payload and return the token', async () => {
    jwtService.signAsync.mockResolvedValue('signed-token');
    const userId = 42;

    const token = await customJwtService.sign(userId);

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      user_id: userId,
      sub: userId,
    });
    expect(token).toBe('signed-token');
  });

  it('should propagate errors from jwtService.signAsync', async () => {
    jwtService.signAsync.mockRejectedValue(new Error('sign error'));

    await expect(customJwtService.sign(1)).rejects.toThrow('sign error');
  });
});
