import { IsEnum, IsString } from 'class-validator';
import { ListType } from '../purchaselist.model';

export class GetListDto {
    @IsString()
    _id: string;

    @IsString()
    name: string;

    @IsEnum(ListType)
    type: ListType;

    @IsString()
    createdAt: string;
}
