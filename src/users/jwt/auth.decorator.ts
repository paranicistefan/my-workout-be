import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTdata = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
