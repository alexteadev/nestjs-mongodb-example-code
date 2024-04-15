import { Module } from '@nestjs/common';
import { BuylistModule } from './buylist/buylist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/configurations';
import { PurchaselistModule } from './purchaselist/purchaselist.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        BuylistModule,
        PurchaselistModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
