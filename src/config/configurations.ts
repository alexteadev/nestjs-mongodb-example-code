import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
    return {
        uri: 'mongodb://' + configService.get('DB_HOST') + ':' + configService.get('DB_PORT'),
        dbName: configService.get('DB_AUTHDATABASE'),
        user: configService.get('DB_LOGIN'),
        pass: configService.get('DB_PASSWORD'),
    };
};
