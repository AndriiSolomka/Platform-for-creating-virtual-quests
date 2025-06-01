import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmTokenService } from '../email-confirm-token.service';

describe('EmailConfirmTokenService', () => {
  let service: EmailConfirmTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConfirmTokenService],
    }).compile();

    service = module.get<EmailConfirmTokenService>(EmailConfirmTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
