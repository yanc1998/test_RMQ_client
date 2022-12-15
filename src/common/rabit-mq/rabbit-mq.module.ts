import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RabbitMqServices} from "./Infra/services/rabbit-mq.services";

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
                }
            }
        }
    ])],
    providers: [RabbitMqServices],
    exports: [RabbitMqServices]
})
export class RabbitMqModule {
}
