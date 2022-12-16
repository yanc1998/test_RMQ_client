import {Module} from '@nestjs/common';
import {RabbitMqServices} from "./Infra/services/rabbit-mq.services";

@Module({
    exports: [RabbitMqServices],
    providers: [RabbitMqServices]
})
export class RabbitMqModule {
}
