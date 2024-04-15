import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        try {
            const validationResult = await this.authService.validateUser(loginDto.email, loginDto.password);
            const { user, jwt } = validationResult;

            res.cookie('AUTH_TOKEN', jwt, {
                httpOnly: true,
            });

            const result = {
                email: user.email,
                token: loginDto.mobile ? jwt : '',
                id: user._id,
                createdAt: user.createdAt,
            };
            res.send(result);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                res.status(401).send({
                    errorCode: 'PassOrEmailNotCorrect',
                    message: 'Invalid credentials',
                    error: error.message,
                });
            } else {
                res.status(500).send({
                    errorCode: 'InterServError',
                    message: 'Internal server error',
                    error: error.message,
                });
            }
        }
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.cookie('AUTH_TOKEN', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.sendStatus(200);
    }
}
