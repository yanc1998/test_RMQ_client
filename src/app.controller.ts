import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {SendEmailUseCase} from "./email/Application/UseCases/send-email.useCase";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly sendEmailUseCase: SendEmailUseCase) {
    }

    @Get()
    getHello() {
        return this.sendEmailUseCase.execute({
            to: "yancarloglez98@gmail.com",
            template: 'test_template',
            data: {
                name: 'Yank'
            }
        })
    }
}
