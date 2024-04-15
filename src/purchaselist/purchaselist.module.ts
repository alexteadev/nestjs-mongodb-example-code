import { Module } from '@nestjs/common';
import { PurchaselistController } from './purchaselist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseListSchema, PurchaselistModel } from './purchaselist.model';
import { PurchaseListService } from './purchaselist.service';
import { EventsModule } from 'src/events/events.module';

@Module({
    controllers: [PurchaselistController],
    imports: [
        MongooseModule.forFeature([
            {
                name: PurchaselistModel.name,
                schema: PurchaseListSchema,
            },
        ]),
        EventsModule,
    ],
    providers: [PurchaseListService],
})
export class PurchaselistModule {}
