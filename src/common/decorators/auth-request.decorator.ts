import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/constants/interfaces/auth/auth.interface';
import { Response } from 'express';

export interface AuthRequestParams {
  req: AuthRequest;
  res: Response;
}

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthRequestParams => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const response = ctx.switchToHttp().getResponse<Response>();
    return { req: request, res: response };
  },
);
