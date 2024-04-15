import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PurchaseListService } from './purchaselist.service';
import { CreateListDto } from './dto/create-list.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { UpdateListDto } from './dto/update-list.dto';
import { LIST_NOT_FOUND_ERROR } from './list.constants';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser, User } from 'src/users/user.decorator';
import { Types } from 'mongoose';

@Controller('purchaselist')
export class PurchaselistController {
    constructor(private readonly listService: PurchaseListService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createList(@Body() dto: CreateListDto, @CurrentUser() user: User) {
        const userId = new Types.ObjectId(user.sub);
        return this.listService.createList(dto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAllLists(@CurrentUser() user: User) {
        const userId = new Types.ObjectId(user.sub);
        return this.listService.getAllLists(userId);
    }

    @Get('byname/:type/:name')
    async getListByName(@Param('type') type: string, @Param('name') name: string) {
        return this.listService.getListByName(type, name);
    }

    @Get('byid/:id')
    async getListById(@Param('id', IdValidationPipe) id: string) {
        return this.listService.getListById(id);
    }

    @Patch(':id')
    async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateListDto) {
        const updatedPurchase = await this.listService.updateListById(id, dto);
        if (!updatedPurchase) {
            throw new NotFoundException(LIST_NOT_FOUND_ERROR);
        }
        return updatedPurchase;
    }

    @Delete(':id')
    async deleteById(@Param('id', IdValidationPipe) id: string) {
        const deletedPurchase = await this.listService.deleteListById(id);
        if (!deletedPurchase) {
            throw new NotFoundException(LIST_NOT_FOUND_ERROR);
        }
    }
}
