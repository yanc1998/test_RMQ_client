import {Injectable} from "@nestjs/common";
import {IRepository} from "../Interfaces/IRepository";
import {BaseEntity} from "../../Entities/mongo/BaseEntity";
import {AnyParamConstructor, ReturnModelType} from "@typegoose/typegoose/lib/types";
import {PaginateIn} from "../../DTO/IN/paginate-in.dto";
import {PaginateOut} from "../../DTO/OUT/out-pagination";

@Injectable()
export class BaseRepository<T extends BaseEntity> implements IRepository<T> {

    private readonly model: ReturnModelType<AnyParamConstructor<T>>;

    constructor(_model: ReturnModelType<AnyParamConstructor<T>>) {
        this.model = _model
    }

    async UpdateProp(filter: {}, prop: {}): Promise<T> {
        return this.model.findOneAndUpdate(filter, prop)
    }

    async updateByModel(model: T): Promise<T> {
        let filter: {} = {_id: model._id};
        let update: {} = {...model};
        return this.model.findOneAndUpdate(filter, update);
    }


    async getById(id: string): Promise<T> {
        return this.model.findById(id);
    }

    async getByFilter(filter: {}): Promise<T> {
        return this.model.findOne(filter);
    }

    async getMany(filter: {}): Promise<T[]> {
        return this.model.find(filter);
    }

    async add(model: T): Promise<T> {
        return await this.model.create(model);
    }

    async deleteById(id: string): Promise<T> {
        let filter: {} = {_id: id};
        return this.model.findOneAndDelete(filter);
    }

    async deleteMany(filter: {}): Promise<any> {
        return this.model.deleteMany(filter);
    }

    async paginate(paginate: PaginateIn): Promise<PaginateOut<T>> {
        let page: number = paginate.page;
        let limit: number = paginate.limit;
        let filter: {} = paginate.filter;

        let items: T[] = await this.model.find(filter).skip((page - 1) * limit).limit(limit);
        let total: number = await this.model.countDocuments(filter)
        let pages = Math.ceil(total / limit);
        return {
            page: page,
            total: total,
            pages: pages,
            data: items
        }
    }
}
