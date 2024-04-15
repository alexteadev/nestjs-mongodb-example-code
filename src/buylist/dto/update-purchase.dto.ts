import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PurchaseType } from '../buylist.model';

export class UpdatePurchaseDto {
    @IsString()
    name: string;

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
}
