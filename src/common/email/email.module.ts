import {Module} from '@nestjs/common';
import {RabbitMqModule} from "../rabit-mq/rabbit-mq.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {SendEmailUseCase} from "./Application/UseCases/send-email.useCase";

@Module({
    imports: [ClientsModule.register([
        {
            name: 'EMAIL_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'cats_queue',
                noAck: false,
                queueOptions: {
                    durable: false
                },
                socketOptions: {noDelay: true},
            }
        }
    ]), RabbitMqModule],
    providers: [SendEmailUseCase],
    exports: [SendEmailUseCase]
})
export class EmailModule {
}
