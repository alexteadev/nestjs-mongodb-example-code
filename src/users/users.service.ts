import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument, UserModel } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { USER_ALREADY_EXISTS_ERROR, USER_NOT_FOUND_ERROR } from './users.constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email }).select('+password').exec();
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException(USER_ALREADY_EXISTS_ERROR);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        return user.save();
    }

    async changePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }

        const isPasswordMatching = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
        if (!isPasswordMatching) {
            throw new BadRequestException('Current password is incorrect');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(changePasswordDto.newPassword, salt);

        await user.save();
        return true;
    }
}
