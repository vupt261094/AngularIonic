import {IUserService} from "../interfaces/user-service.interface";
import {Injectable} from "@angular/core";
import {from, Observable, throwError} from "rxjs";
import {AppConfigService} from "./app-config.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BasicLoginViewModel} from "../../view-models/basic-login.view-model";
import {flatMap, map} from "rxjs/operators";
import {UserViewModel} from "../../view-models/user.view-model";
import {LoginResultViewModel} from "../../view-models/login-result.view-model";
import {Facebook} from "@ionic-native/facebook/ngx";
import {GooglePlus} from "@ionic-native/google-plus/ngx";

@Injectable()
export class UserService implements IUserService {

    //#region Properties

    private _baseUrl = '';

    private _clientId = '';

    private _clientSecret = '';

    private _defaultHttpHeaders: HttpHeaders;

    //#endregion

    //#region Constructor

    public constructor(public appConfigService: AppConfigService,
                       public facebookProvider: Facebook,
                       public googleProvider: GooglePlus,
                       public httpClient: HttpClient) {
        const appConfig = appConfigService.loadConfigurationFromCache();
        if (appConfig) {
            this._baseUrl = appConfig.baseUrl;
            this._clientId = appConfig.clientId;
            this._clientSecret = appConfig.clientSecret;
        }

        this._defaultHttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');
    }

    //#endregion

    //#region Methods

    // Login asynchronously.
    public basicLoginAsync(model: BasicLoginViewModel): Observable<LoginResultViewModel> {
        const fullUrl = `${this._baseUrl}/connect/token`;

        const basicLoginFormData = new HttpParams()
            .set('grant_type', 'password')
            .set('username', model.username)
            .set('password', model.password)
            .set('scopes', (model.scopes && model.scopes.length) ? model.scopes.join(' ') : null)
            .set('client_id', this._clientId)
            .set('client_secret', this._clientSecret);

        const options = {
            headers: this._defaultHttpHeaders
        };

        return this.httpClient
            .post(fullUrl, basicLoginFormData.toString(), options)
            .pipe(
                map((basicLoginResult: any) => {
                    const model = new LoginResultViewModel();
                    model.accessToken = basicLoginResult.access_token;
                    model.lifetime = basicLoginResult.expires_in;
                    model.tokenType = basicLoginResult.token_type;
                    model.refreshToken = basicLoginResult.refresh_token;
                    return model;
                })
            )
    }

    // Do google login asynchronously.
    public loginGoogleAsync(): Observable<LoginResultViewModel> {

        return from(this.googleProvider
            .login({
                webClientId: '323676358406-ikvol20relacv3mn5popdi79e5m759pc.apps.googleusercontent.com'
            }))
            .pipe(
                flatMap(authResult => {
                    // Build full url.
                    const fullUrl = `${this._baseUrl}/connect/token`;

                    const loginGoogleFormData = new HttpParams()
                        .set('grant_type', 'Google')
                        .set('scopes', 'api1 offline_access')
                        .set('client_id', this._clientId)
                        .set('client_secret', this._clientSecret);

                    const options = {
                        headers: this._defaultHttpHeaders
                    };

                    return this.httpClient
                        .post(fullUrl, loginGoogleFormData.toString(), options);
                }),
                map((loginGoogleResult: any) => {
                    const model = new LoginResultViewModel();
                    model.accessToken = loginGoogleResult.access_token;
                    model.lifetime = loginGoogleResult.expires_in;
                    model.tokenType = loginGoogleResult.token_type;
                    model.refreshToken = loginGoogleResult.refresh_token;
                    return model;
                })
            );


    }

    // Do facebook login asynchronously.
    public loginFacebookAsync(): Observable<LoginResultViewModel> {

        // Build full url.
        const fullUrl = `${this._baseUrl}/connect/token`;

        const options = {
            headers: this._defaultHttpHeaders
        };

        return from(this.facebookProvider
            .login(['public_profile', 'email', 'user_birthday']))
            .pipe(
                flatMap(facebookLoginResult => {
                    if (!facebookLoginResult) {
                        return throwError('Failed to use facebook login');
                    }

                    const authResponse = facebookLoginResult.authResponse;
                    if (!authResponse) {
                        return throwError('Failed to use facebook login');
                    }

                    const loginGoogleFormData = new HttpParams()
                        .set('grant_type', 'Facebook')
                        .set('scopes', 'api1 offline_access')
                        .set('client_id', this._clientId)
                        .set('client_secret', this._clientSecret)
                        .set('access_token', authResponse.accessToken);

                    return this.httpClient
                        .post(fullUrl, loginGoogleFormData.toString(), options)
                }),
                map((loginFacebookResult: any) => {
                    const model = new LoginResultViewModel();
                    model.accessToken = loginFacebookResult.access_token;
                    model.lifetime = loginFacebookResult.expires_in;
                    model.tokenType = loginFacebookResult.token_type;
                    model.refreshToken = loginFacebookResult.refresh_token;
                    return model;
                })
            );
    }


    // Load user profile asynchronously.
    public loadProfileAsync(): Observable<UserViewModel> {
        const fullUrl = `${this._baseUrl}/api/user/profile`;
        return this.httpClient
            .get<UserViewModel>(fullUrl);
    }

    //#endregion

}
