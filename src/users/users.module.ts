import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserModel, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
