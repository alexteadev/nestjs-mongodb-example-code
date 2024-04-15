import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithUser } from './request-with-user.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser, User } from './user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Req() req: RequestWithUser, @Body() changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const email = req.user.email;
        return this.usersService.changePassword(email, changePasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@CurrentUser() user: User) {
        return user;
    }
}
