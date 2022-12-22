import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {PublishEventUseCase} from "./common/event-domain/Aplication/UseCases/publish-event.useCase";
import {EventType} from "./common/event-domain/Domain/Enums/event-type.enum";
import {EventStatus} from "./common/event-domain/Domain/Enums/event-status";
import {DomainEvent} from "./common/event-domain/Domain/Entity/domain-event.entity";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly publishEvent: PublishEventUseCase) {
    }

    @Get()
    getHello() {
        return this.publishEvent.execute({
            type: EventType.SEND_EMAIL,
            status: EventStatus.SEND,
            data: {
                to: "yancarloglez98@gmail.com",
                template: 'test_template',
                data: {
                    name: 'Yank'
                }
            }
        } as any)

        // const func = (a): Promise<void> => {
        //     console.log(a)
        //     return
        // };
        // return this.sendEmailUseCase.execute({
        //     to: "yancarloglez98@gmail.com",
        //     template: 'test_template',
        //     data: {
        //         name: 'Yank'
        //     }
        // }, func)
    }
}
