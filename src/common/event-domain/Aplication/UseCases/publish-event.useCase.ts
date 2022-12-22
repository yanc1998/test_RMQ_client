import {Injectable, Logger} from "@nestjs/common";
import {EventDomainRepository} from "../../Infrastructure/repositories/event-domain.repository";
import {DomainEvent} from "../../Domain/Entity/domain-event.entity";
import {EventStatus} from "../../Domain/Enums/event-status";

@Injectable()
export class PublishEventUseCase {
    private _Logger: Logger

    constructor(private readonly eventDomainRepository: EventDomainRepository) {
        this._Logger = new Logger("publish event domain")
    }

    async execute(request: DomainEvent): Promise<DomainEvent> {
        this._Logger.log("execute")
        request.status = EventStatus.SEND
        return this.eventDomainRepository.add(request)
    }
}
