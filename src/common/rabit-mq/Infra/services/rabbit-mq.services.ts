import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy, RmqRecordBuilder} from "@nestjs/microservices"

@Injectable()
export class RabbitMqServices {
    constructor(@Inject("EMAIL_SERVICE") private readonly clientService: ClientProxy) {
    }

    sendMessage(data: Record<string, any>) {
        const record = new RmqRecordBuilder(data).setOptions({
            priority: 3,
        })
        this.clientService.send('send-email', record).subscribe((ack) => {
            console.log(ack)
            return ack
        })
    }
}
