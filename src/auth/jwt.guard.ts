import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.cookies['AUTH_TOKEN'];
            const decoded = await this.authService.verifyToken(token);
            if (!decoded) {
                throw new UnauthorizedException('Invalid token');
            }
            request.user = decoded;
            return true;
        } catch (e) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
