import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {RabbitMqServices} from "./common/rabit-mq/Infra/services/rabbit-mq.services";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly rmq: RabbitMqServices) {
    }

    @Get()
    getHello() {
        return this.rmq.sendMessage({test: 'algo'})
    }
}
