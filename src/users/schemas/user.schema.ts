import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<UserModel>;

// @Schema()
@Schema({ _id: true, versionKey: false, timestamps: { createdAt: true, updatedAt: false } })
export class UserModel {
    @Prop({ unique: true, required: true, type: String })
    email: string;

    @Prop({ required: true, select: false }) // "select: false" предотвратит выборку пароля по умолчанию
    password: string;

    createdAt: Date;

    // @Prop({ default: Date.now })
    // createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
