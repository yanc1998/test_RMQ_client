import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {RabbitMqServices} from "../../../rabit-mq/Infra/services/rabbit-mq.services";
import {SendEmailDto} from "../DTO/send-email.dto";

@Injectable()
export class SendEmailUseCase {
    private rabbitMqService: RabbitMqServices

    constructor(@Inject("EMAIL_SERVICE") private readonly clientService: ClientProxy) {
        this.rabbitMqService = new RabbitMqServices(clientService)
    }

    execute(request: SendEmailDto, callBack: (...params) => Promise<void>) {

        return this.rabbitMqService.sendMessage({
            template: request.template, to: request.to, data: request.data
        }, 'send-email', callBack)
    }
}
