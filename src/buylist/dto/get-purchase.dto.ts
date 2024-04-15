import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PurchaseType } from '../buylist.model';

export class UpdatePurchaseDto {
    @IsString()
    _id: string;

    @IsString()
    purchaseListId: string;

    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    purchased: boolean;

    @Min(0)
    @IsNumber()
    @IsOptional()
    price: number;

    @Min(0)
    @IsNumber()
    @IsOptional()
    amount: number;

    @Min(0)
    @IsNumber()
    @IsOptional()
    amountPurchase: number;

    @IsEnum(PurchaseType)
    @IsOptional()
    type: PurchaseType;

    @IsString()
    createdAt: string;
}
