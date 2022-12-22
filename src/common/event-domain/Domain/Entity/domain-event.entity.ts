import {prop} from "@typegoose/typegoose";
import {EventType} from "../Enums/event-type.enum";
import {BaseEntity} from "../../../Entities/mongo/BaseEntity";
import {EventStatus} from "../Enums/event-status";

export class DomainEvent extends BaseEntity {
    @prop()
    type: EventType

    @prop()
    status: EventStatus

    @prop()
    data: {}
}
