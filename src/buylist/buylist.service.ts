import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyListDocument, BuylistModel } from './buylist.model';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BuyListService {
    constructor(
        @InjectModel(BuylistModel.name) private buyListModel: Model<BuyListDocument>,
    ) {}

    async createPurchase(dto: CreatePurchaseDto) {
        return this.buyListModel.create(dto);
    }

    async getAllPurchase(purchaseListId: string) {
        return this.buyListModel.find({ purchaseListId }).exec();
    }

    async getPurchaseById(id: string) {
        return this.buyListModel.findById(id).exec();
    }

    async updatePurchaseById(id: string, dto: UpdatePurchaseDto) {
        let purchasedStatus = false;
        if (dto?.amount != undefined && dto?.amountPurchase >= dto?.amount) {
            purchasedStatus = true;
        }
        return this.buyListModel.findByIdAndUpdate(id, { ...dto, purchased: purchasedStatus }, { new: true }).exec();
    }

    async deletePurchaseById(id: string) {
        return this.buyListModel.findByIdAndDelete(id).exec();
    }

    async updateStatus(id: string, amountPurchase: number) {
        let purchasedStatus = false;
        const purchase = await this.getPurchaseById(id);
        if (purchase?.amount != undefined && amountPurchase >= purchase?.amount) {
            purchasedStatus = true;
        }
        return this.buyListModel.findByIdAndUpdate(id, { purchased: purchasedStatus, amountPurchase }).exec();
    }

    @OnEvent('purchaseList.deleted')
    async handlePurchaseListDeletedEvent(purchaseListId: string) {
        await this.buyListModel.deleteMany({ purchaseListId }).exec();
    }
}
