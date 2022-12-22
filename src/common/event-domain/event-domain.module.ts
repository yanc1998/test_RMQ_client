import {Module} from '@nestjs/common';
import {EmailModule} from "../email/email.module";
import {PublishEventUseCase} from "./Aplication/UseCases/publish-event.useCase";
import {EventDomainRepository} from "./Infrastructure/repositories/event-domain.repository";
import {TypegooseModule} from "nestjs-typegoose";
import {DomainEvent} from "./Domain/Entity/domain-event.entity";
import {ExecuteEventUseCase} from "./Aplication/UseCases/execute-event.useCase";

@Module({
    imports: [TypegooseModule.forRoot('mongodb://localhost:27017/domain-events', {}), EmailModule, TypegooseModule.forFeature([DomainEvent])],
    providers: [PublishEventUseCase, EventDomainRepository, ExecuteEventUseCase],
    exports: [PublishEventUseCase]
})
export class EventDomainModule {
}
