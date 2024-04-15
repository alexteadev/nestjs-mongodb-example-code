import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt.guard';
import { getJWTConfig } from 'src/config/jwt.config';

@Global()
@Module({
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: getJWTConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
