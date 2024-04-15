import { IsEnum, IsString } from 'class-validator';
import { ListType } from '../purchaselist.model';

export class UpdateListDto {
    @IsString()
    name: string;

    @IsEnum(ListType)
    type: ListType;
}
