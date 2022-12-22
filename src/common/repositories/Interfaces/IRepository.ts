import {PaginateIn} from "../../DTO/IN/paginate-in.dto";
import {PaginateOut} from "../../DTO/OUT/out-pagination";

export interface IRepository<T> {
    getById(id: string): Promise<T>;

    getMany(filter: {}): Promise<T[]>;

    add(model: T): Promise<T>;

    deleteById(id: string): Promise<T>;

    deleteMany(filter: {}): Promise<T[]>;

    updateByModel(model: T): Promise<T>;

    UpdateProp(filter: {}, prop: {}): Promise<T>;

    paginate(paginate: PaginateIn): Promise<PaginateOut<T>>;

    getByFilter(filter: {}): Promise<T>;
}
