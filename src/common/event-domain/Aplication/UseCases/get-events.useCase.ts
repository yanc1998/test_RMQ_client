import {Injectable, Logger} from "@nestjs/common";
import {EventDomainRepository} from "../../Infrastructure/repositories/event-domain.repository";
import {DomainEvent} from "../../Domain/Entity/domain-event.entity";
import {EventStatus} from "../../Domain/Enums/event-status";

@Injectable()
export class getEventsUseCase {
    private _Logger: Logger

    constructor(private readonly eventDomainRepository: EventDomainRepository) {
        this._Logger = new Logger("get events domain")
    }

    async execute(status: EventStatus): Promise<DomainEvent[]> {
        return this.eventDomainRepository.getMany({status: status})
    }
}
