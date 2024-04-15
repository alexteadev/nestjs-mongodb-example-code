import { Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface JWTPayload {
    email: string;
    sub: string;
    createdAt: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<{ user: UserDocument; jwt: string }> {
        const user = await this.usersService.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            return {
                user,
                jwt: await this.getJwt(user),
            };
        }
        throw new UnauthorizedException('Invalid email or password');
    }

    async login(user: UserDocument) {
        return {
            access_token: this.getJwt(user),
        };
    }

    async verifyToken(token: string): Promise<JWTPayload | null> {
        try {
            return this.jwtService.verify<JWTPayload>(token);
        } catch (e) {
            return null;
        }
    }

    async getJwt(user: UserDocument) {
        const payload: JWTPayload = {
            email: user.email,
            sub: user._id.toString(),
            createdAt: user.createdAt.toString(),
        };
        return this.jwtService.sign(payload);
    }
}
