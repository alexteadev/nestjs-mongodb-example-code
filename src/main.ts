import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const corsOptions = {
        origin: '',
        credentials: true,
    };
    const app = await NestFactory.create(AppModule, { cors: corsOptions });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();
