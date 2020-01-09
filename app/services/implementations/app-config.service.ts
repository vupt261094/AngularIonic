import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigModel} from "../../models/app-config.model";

@Injectable()
export class AppConfigService {

    //#region Properties

    private _appConfiguration: AppConfigModel;

    //#endregion

    //#region Constructors

    constructor(public httpClient: HttpClient) {

    }

    //#endregion

    //#region Application configuration

    /*
    * Load app configuration from json file.
    * */
    public loadConfigurationFromFile(): Promise<AppConfigModel> {
        return this.httpClient
            .get('/assets/app-config.dev.json')
            .toPromise()
            .then(data => {
                let options = <AppConfigModel>data;
                this._appConfiguration = options;
                return options;
            });
    }

    /*
    * Load configuration from cache.
    * */
    public loadConfigurationFromCache(): AppConfigModel {
        return this._appConfiguration;
    }

    //#endregion
}
