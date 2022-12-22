import {prop} from "@typegoose/typegoose";

export class BaseEntity {
    _id?: string

    @prop({default: new Date()})
    created_at: Date

    @prop({default: null})
    updated_at: Date

}
