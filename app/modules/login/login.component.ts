import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BasicLoginViewModel} from "../../view-models/basic-login.view-model";
import {IUserService} from "../../services/interfaces/user-service.interface";
import {catchError, finalize, flatMap, map} from "rxjs/operators";
import {LoadingController, ToastController} from "@ionic/angular";
import {forkJoin, from, Observable, of, Subscription, throwError} from "rxjs";
import {Router} from "@angular/router";
import {StorageKeyConstant} from "../../constants/storage-key.constant";
import {Storage} from '@ionic/storage';
import {LoginResultViewModel} from "../../view-models/login-result.view-model";
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage/ngx";
import {SecureStorageKeyConstant} from "../../constants/secure-storage-key.constant";
import {SecureStorageNameConstant} from "../../constants/secure-storage-name.constant";

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

    //#region Properties

    // Basic login model.
    public basicLoginModel: BasicLoginViewModel;

    // Subscription about basic login.
    private _loginSubscription: Subscription;

    // Subscription about enabling secure storag.
    private _enableSecureStorageSubscription: Subscription;

    // Whether fingerprint authentication has been enabled or not.
    private _hasFingerprintAuthenticationEnabled = false;

    // Secure storage that uses for storing secure information.
    private _secureStorage: SecureStorageObject;

    //#endregion

    //#region Accessors

    // Check whether finger print authentication enabled or not.
    public get hasFingerPrintAuthenticationEnabled(): boolean {

        if (!this._secureStorage) {
            return false;
        }

        return true;
    }

    //#endregion

    //#region Constructor

    public constructor(@Inject('IUserService') public userService: IUserService,
                       public loadingController: LoadingController,
                       public storage: Storage,
                       public secureStorageService: SecureStorage,
                       public toastController: ToastController,
                       public router: Router) {
        this.basicLoginModel = new BasicLoginViewModel();
        this.basicLoginModel.username = 'redplane_dt';
        this.basicLoginModel.password = 'administrator';
        this.basicLoginModel.scopes = ['api1'];

    }

    //#endregion

    //#region Method

    /*
    * Called when component is initialized.
    * */
    public ngOnInit(): void {

        if (this._enableSecureStorageSubscription && !this._enableSecureStorageSubscription.closed) {
            this._enableSecureStorageSubscription.unsubscribe();
        }

        // Enable secure storage.
        const enableSecureStorageObservable = from(this.secureStorageService
            .create(SecureStorageNameConstant.app));


        this._enableSecureStorageSubscription = enableSecureStorageObservable
            .pipe(
                map((storage: SecureStorageObject) => {

                    // Bind secure storage information.
                    this._secureStorage = storage;

                    return storage;
                }),
                catchError(() => {
                    return throwError('Cannot initialize secure storage');
                })
            )
            .subscribe();

    }

    /*
    * Called when login button is clicked.
    * */
    public ngOnLoginSubmitted(event: Event) {

        if (event) {
            event.preventDefault();
        }

        let loadingMessage: any = null;

        if (this._loginSubscription && !this._loginSubscription.closed) {
            this._loginSubscription.unsubscribe();
        }

        this._loginSubscription = from(this.loadingController
            .create())
            .pipe(
                flatMap((message: any) => {
                    message.present();
                    loadingMessage = message;
                    return this.doBasicLoginAsync(this.basicLoginModel.username, this.basicLoginModel.password, true);
                }),
                flatMap(() => {
                    // Navigate user to main page.
                    return from(this.router.navigate(['/main']))
                }),
                finalize(() => {
                    loadingMessage.dismiss();
                })
            )
            .subscribe();
    }

    /*
    * Called when facebook login is clicked.
    * */
    public clickFacebookLogin(): void {

        // Loading message instance.
        let loadingMessage: any = null;

        if (this._loginSubscription && !this._loginSubscription.closed) {
            this._loginSubscription.unsubscribe();
        }

        this._loginSubscription = from(this.loadingController.create({}))
            .pipe(
                flatMap((loader: any) => {
                    loader.present();
                    loadingMessage = loader;

                    return this.userService
                        .loginFacebookAsync()
                }),
                flatMap((basicLoginResult: LoginResultViewModel) => {
                    return from(this.storage.set(StorageKeyConstant.accessToken, basicLoginResult.accessToken));
                }),
                flatMap(() => {
                    // Navigate user to main page.
                    return from(this.router.navigate(['/main']))
                }),
                finalize(() => {
                    loadingMessage.dismiss();
                })
            )
            .subscribe();
    }

    /*
    * Called when google login is clicked.
    * */
    public clickGoogleLogin(): void {

        // Loading message instance.
        let loadingMessage: any = null;

        if (this._loginSubscription && !this._loginSubscription.closed) {
            this._loginSubscription.unsubscribe();
        }

        this._loginSubscription = from(this.loadingController.create({}))
            .pipe(
                flatMap((loader: any) => {
                    loader.present();
                    loadingMessage = loader;

                    return this.userService
                        .loginGoogleAsync()
                }),
                flatMap((basicLoginResult: LoginResultViewModel) => {
                    return from(this.storage.set(StorageKeyConstant.accessToken, basicLoginResult.accessToken));
                }),
                flatMap(() => {
                    // Navigate user to main page.
                    return from(this.router.navigate(['/main']))
                }),
                finalize(() => {
                    loadingMessage.dismiss();
                })
            )
            .subscribe();


    }

    /*
    * Called when finger print login is clicked.
    * */
    // public clickFingerprintLogin(): void {

    //     // Cancel previous login task.
    //     if (this._loginSubscription && !this._loginSubscription.closed) {
    //         this._loginSubscription.unsubscribe();
    //     }

    //     // Check whether user has saved username & password in secure storage or not.
    //     this._loginSubscription = this.loadLoginFieldsFromSecureStorageAsync()
    //         .pipe(
    //             flatMap((basicLoginModel: BasicLoginViewModel) => {

    //                 // No information has been found.
    //                 if (!basicLoginModel) {
    //                     const displayMessagePromise = this.toastController
    //                         .create({
    //                             message: `Username & password haven't been saved. Please do login first`,
    //                             duration: 5000
    //                         })
    //                         .then(dialog => {
    //                             dialog.present();
    //                         });

    //                     return from(displayMessagePromise);
    //                 }

    //                 const authenticateFingerprintPromise = this.fingerprintLoginService
    //                     .show({
    //                         clientId: 'Fingerprint-Demo',
    //                         clientSecret: 'password', //Only necessary for Android
    //                         disableBackup: true,  //Only for Android(optional)
    //                         localizedFallbackTitle: 'Use Pin', //Only for iOS
    //                         localizedReason: 'Please authenticate' //Only for iOS
    //                     });

    //                 // Load mesage instance.
    //                 let loadingMessage = null;

    //                 return from(authenticateFingerprintPromise)
    //                     .pipe(
    //                         flatMap(() => {

    //                             return from(this.loadingController
    //                                 .create());
    //                         }),
    //                         flatMap((message: any) => {
    //                             message.present();
    //                             loadingMessage = message;
    //                             return this.doBasicLoginAsync(this.basicLoginModel.username, this.basicLoginModel.password, false);
    //                         }),
    //                         flatMap(() => {
    //                             // Navigate user to main page.
    //                             return from(this.router.navigate(['/main']))
    //                         }),
    //                         finalize(() => {
    //                             loadingMessage.dismiss();
    //                         })
    //                     );
    //             })
    //         )
    //         .subscribe();
    // }

    /*
    * Called when component is destroyed.
    * */
    public ngOnDestroy(): void {
        if (this._loginSubscription && !this._loginSubscription.closed) {
            this._loginSubscription.unsubscribe();
        }

        if (this._enableSecureStorageSubscription && !this._enableSecureStorageSubscription.closed) {
            this._enableSecureStorageSubscription.unsubscribe();
        }
    }

    /*
    * Do basic login.
    * */
    protected doBasicLoginAsync(username: string, password: string, addToSecureStorage: boolean): Observable<LoginResultViewModel> {

        const basicLoginModel = {
            ...this.basicLoginModel,
            username,
            password
        };

        return this.userService.basicLoginAsync(basicLoginModel)
            .pipe(
                flatMap((basicLoginResult: LoginResultViewModel) => {

                    // List of observable that needs completing.
                    const observables = [];

                    // Add access token to storage observable.
                    observables.push(from(this.storage.set(StorageKeyConstant.accessToken, basicLoginResult.accessToken)));

                    // Add username and password to secure storage
                    if (this.hasFingerPrintAuthenticationEnabled && addToSecureStorage) {
                        observables.push(this._secureStorage
                            .set(SecureStorageKeyConstant.username, username));

                        observables.push(this._secureStorage
                            .set(SecureStorageKeyConstant.password, password));
                    }

                    return forkJoin(observables)
                        .pipe(
                            map(() => basicLoginResult)
                        );
                })
            );
    }

    /*
    * Load login information from secure storage
    * */
    protected loadLoginFieldsFromSecureStorageAsync(): Observable<BasicLoginViewModel> {

        if (!this.hasFingerPrintAuthenticationEnabled) {
            return of(null);
        }

        // Find username and password that have been stored in secure storage.
        const loadUsernameObservable = from(this._secureStorage.get(SecureStorageKeyConstant.username));
        const loadPasswordObservable = from(this._secureStorage.get(SecureStorageKeyConstant.password));

        return forkJoin(loadUsernameObservable, loadPasswordObservable)
            .pipe(
                map((loadResults: string[]) => {
                    const username = loadResults[0];
                    const password = loadResults[1];

                    return {
                        ...this.basicLoginModel,
                        username,
                        password
                    };
                }),
                catchError(() => of(null))
            );
    }

    //#endregion
}
