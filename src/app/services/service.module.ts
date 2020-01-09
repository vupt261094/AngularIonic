import {NgModule, ModuleWithProviders} from "@angular/core";
import {MessageBusService} from "./implementations/message-bus.service";
import {QrLoginService} from "./implementations/qr-login.service";
import {UserService} from "./implementations/user.service";

@NgModule()
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                {provide: 'IMessageBusService', useClass: MessageBusService},
                {provide: 'IQrLoginService', useClass: QrLoginService},
                {provide: 'IUserService', useClass: UserService}
            ]
        }
    }
}
