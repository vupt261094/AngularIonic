import {IQrLoginService} from "../interfaces/qr-login-service.interface";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AppConfigService} from "./app-config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class QrLoginService implements IQrLoginService {

    //#region Properties

    private qrServiceBaseUrl: string;

    //#endregion

    //#region Constructor

    public constructor(public appConfigService: AppConfigService,
                       public httpClient: HttpClient) {
        const appConfig = this.appConfigService.loadConfigurationFromCache();
        if (appConfig) {
            this.qrServiceBaseUrl = appConfig.baseUrl;
        }
    }

    //#endregion

    //#region Methods

    // Exchange session id with the server to resolve login session.
    public resolveQrLoginSessionAsync(sessionId: string): Observable<void> {
        const fullUrl = `${this.qrServiceBaseUrl}/api/qr/resolve-session`;
        return this.httpClient
            .post(fullUrl, {sessionId})
            .pipe(
                map(() => void (0))
            );
    }

    //#endregion

}
