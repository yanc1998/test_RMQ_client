import {BaseRepository} from "../../../repositories/mongoose-repo/BaseRepository";
import {DomainEvent} from "../../Domain/Entity/domain-event.entity";
import {ReturnModelType} from "@typegoose/typegoose/lib/types";
import {InjectModel} from "nestjs-typegoose";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EventDomainRepository extends BaseRepository<DomainEvent> {
    constructor(@InjectModel(DomainEvent) private readonly eventModel: ReturnModelType<typeof DomainEvent>) {
        super(eventModel)
    }
}
