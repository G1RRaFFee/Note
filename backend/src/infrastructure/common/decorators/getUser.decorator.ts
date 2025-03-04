import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface User {
  id: number;
}

export const GetUser = createParamDecorator<keyof User | undefined>(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User | User[keyof User] | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    return data ? user?.[data] : user;
  },
);
