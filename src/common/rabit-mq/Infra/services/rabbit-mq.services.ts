import {Logger} from "@nestjs/common";
import {ClientProxy, RmqRecordBuilder} from "@nestjs/microservices"

export class RabbitMqServices {
    private readonly _logger: Logger
    private clientService: ClientProxy

    constructor(_clientService: ClientProxy) {
        this.clientService = _clientService;
        this._logger = new Logger("RabbitMqService")
    }

    sendMessage(data: Record<string, any>, route: string, callBack: (...params) => Promise<void>) {
        this._logger.log("send message")
        const record = new RmqRecordBuilder(data).setOptions({
            priority: 3,
        })
        this.clientService.send(route, record).subscribe(async (response) => {
            await callBack(response)
        })
    }
}
