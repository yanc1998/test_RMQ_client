import {Injectable, Logger} from "@nestjs/common";
import {EventDomainRepository} from "../../Infrastructure/repositories/event-domain.repository";
import {SendEmailUseCase} from "../../../email/Application/UseCases/send-email.useCase";
import {EventType} from "../../Domain/Enums/event-type.enum";
import {SendEmailDto} from "../../../email/Application/DTO/send-email.dto";
import {EventStatus} from "../../Domain/Enums/event-status";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class ExecuteEventUseCase {
    private _Logger: Logger

    constructor(private readonly eventDomainRepository: EventDomainRepository, private readonly sendEmailUseCase: SendEmailUseCase) {
        this._Logger = new Logger("publish event domain")
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async execute(): Promise<void> {
        console.log('send')
        this._Logger.log("execute")
        const eventsDomains = await this.eventDomainRepository.getMany({
            status: EventStatus.SEND
        })
        console.log(eventsDomains)

        await Promise.all(eventsDomains.map(async (eventDomain) => {
            if (eventDomain.type == EventType.SEND_EMAIL) {
                //ponerle el estado pendiente
                await this.eventDomainRepository.UpdateProp({id: eventDomain._id}, {status: EventStatus.PENDING})

                //enviar el correo
                await this.sendEmailUseCase.execute(eventDomain.data as SendEmailDto, async (response: any) => {
                    // si todo fue bien borrar el evento
                    console.log(response, 'response')
                    if (response.status == '200') {
                        this._Logger.log(`event ${eventDomain.type} complete successfully`)
                        await this.eventDomainRepository.deleteById(eventDomain._id)
                        return
                    }

                    // si dio algun error poner el evento en estado de error
                    await this.eventDomainRepository.UpdateProp({id: eventDomain._id}, {status: EventStatus.ERROR})

                })
            }

        }))
    }
}
