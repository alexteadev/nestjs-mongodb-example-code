import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MonSchema } from 'mongoose';
import { PurchaselistModel } from 'src/purchaselist/purchaselist.model';

export type BuyListDocument = HydratedDocument<BuylistModel>;

export enum PurchaseType {
    Count = 'Count',
    Litr = 'Litr',
    Kg = 'Kg',
    Gallon = 'Gallon',
    Pound = 'Pound',
    Another = 'Another',
}

@Schema({
    _id: true,
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
})
export class BuylistModel {
    @Prop({ type: MonSchema.Types.ObjectId, ref: PurchaselistModel.name, index: true })
    purchaseListId: Types.ObjectId;

    @Prop()
    name: string;

    @Prop({ default: false })
    purchased?: boolean;

    @Prop()
    price?: number;

    @Prop()
    amount?: number;

    @Prop()
    amountPurchase?: number;

    @Prop({ enum: PurchaseType })
    type?: PurchaseType;
}

export const BuyListSchema = SchemaFactory.createForClass(BuylistModel);
