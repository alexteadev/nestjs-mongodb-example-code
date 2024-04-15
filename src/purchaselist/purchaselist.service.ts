import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PurchaseListDocument, PurchaselistModel } from './purchaselist.model';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PurchaseListService {
    constructor(
        @InjectModel(PurchaselistModel.name) private purchaseListModel: Model<PurchaseListDocument>,
        private eventEmitter: EventEmitter2,
    ) {}

    async createList(dto: CreateListDto, userId: Types.ObjectId) {
        const newList = { ...dto, userId };
        return this.purchaseListModel.create(newList);
    }

    async getAllLists(userId: Types.ObjectId) {
        return this.purchaseListModel.find({ userId }).exec();
    }

    async getListById(id: string) {
        return this.purchaseListModel.findById(id).exec();
    }

    async getListByName(type: string, name: string) {
        return this.purchaseListModel.find({ type, name }).exec();
    }

    async updateListById(id: string, dto: UpdateListDto) {
        return this.purchaseListModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async deleteListById(id: string) {
        const result = await this.purchaseListModel.findByIdAndDelete(id).exec();
        if (result) {
            this.eventEmitter.emit('purchaseList.deleted', id);
        }
        return result;
    }
}
