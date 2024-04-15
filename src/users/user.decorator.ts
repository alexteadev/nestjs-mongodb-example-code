import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
    email: string;
    sub: string;
    createdAt: string;
}

export const CurrentUser = createParamDecorator((_, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return {
        email: request.user.email,
        sub: request.user.sub,
        createdAt: request.user.createdAt,
    };
});
