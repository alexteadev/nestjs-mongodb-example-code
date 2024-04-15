import { IsEnum, IsString } from 'class-validator';
import { ListType } from '../purchaselist.model';

export class CreateListDto {
    @IsString()
    name: string;

    @IsEnum(ListType)
    type: ListType;
}
