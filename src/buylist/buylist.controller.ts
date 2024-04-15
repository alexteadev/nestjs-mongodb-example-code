import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { BuyListService } from './buylist.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PURCHASE_NOT_FOUND_ERROR } from './buylist.constants';

@Controller('buylist')
export class BuylistController {
    constructor(private readonly buyListService: BuyListService) {}

    @Post('/')
    async createPurchase(@Body() dto: CreatePurchaseDto) {
        return this.buyListService.createPurchase(dto);
    }

    @Get(':purchaseListId')
    async getAllPurchase(@Param('purchaseListId', IdValidationPipe) purchaseListId: string) {
        return this.buyListService.getAllPurchase(purchaseListId);
    }

    @Patch(':id')
    async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdatePurchaseDto) {
        const updatedPurchase = await this.buyListService.updatePurchaseById(id, dto);
        if (!updatedPurchase) {
            throw new NotFoundException(PURCHASE_NOT_FOUND_ERROR);
        }
        return updatedPurchase;
    }

    @Delete(':id')
    async deleteById(@Param('id', IdValidationPipe) id: string) {
        const deletedPurchase = await this.buyListService.deletePurchaseById(id);
        if (!deletedPurchase) {
            throw new NotFoundException(PURCHASE_NOT_FOUND_ERROR);
        }
    }

    @Patch('status/:id') // @Body('amountPurchase') amountPurchase: number
    async updateStatusById(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdatePurchaseDto) {
        const updatedPurchase = await this.buyListService.updateStatus(id, dto.amountPurchase);
        if (!updatedPurchase) {
            throw new NotFoundException(PURCHASE_NOT_FOUND_ERROR);
        }
        return updatedPurchase;
    }
}
