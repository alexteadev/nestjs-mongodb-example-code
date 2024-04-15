import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MonSchema } from 'mongoose';
import { UserModel } from 'src/users/schemas/user.schema';

export type PurchaseListDocument = HydratedDocument<PurchaselistModel>;

export enum ListType {
    List = 'List',
    Storage = 'Storage',
    Plan = 'Plan',
}

@Schema({
    _id: true,
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
})
export class PurchaselistModel {
    @Prop()
    name: string;

    @Prop({ enum: ListType })
    type: ListType;

    @Prop({ type: MonSchema.Types.ObjectId, ref: UserModel.name, index: true })
    userId: Types.ObjectId;
}

export const PurchaseListSchema = SchemaFactory.createForClass(PurchaselistModel);
