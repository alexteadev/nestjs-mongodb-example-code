import { Module } from '@nestjs/common';
import { BuylistController } from './buylist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyListSchema, BuylistModel } from './buylist.model';
import { BuyListService } from './buylist.service';
import { EventsModule } from 'src/events/events.module';

@Module({
    controllers: [BuylistController],
    imports: [
        MongooseModule.forFeature([
            {
                name: BuylistModel.name,
                schema: BuyListSchema,
            },
        ]),
        EventsModule,
    ],
    providers: [BuyListService],
})
export class BuylistModule {}
