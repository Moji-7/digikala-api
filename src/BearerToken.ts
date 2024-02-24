import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.slice(7);
    }
    return null;
  },
);
