import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request['user'];
  },
);
