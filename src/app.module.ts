import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventDomainModule} from "./common/event-domain/event-domain.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [EventDomainModule, ScheduleModule.forRoot(),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
