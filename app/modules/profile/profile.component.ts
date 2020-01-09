import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner/ngx";
import {IQrLoginService} from "../../services/interfaces/qr-login-service.interface";
import {from, Observable, of, Subscription, throwError} from "rxjs";
import {catchError, finalize, flatMap, map, tap} from "rxjs/operators";
import {Platform, ToastController} from "@ionic/angular";

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'qr-login',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    //#region Properties

    // Subscription in the system.
    private readonly _subscriptions: Subscription;

    // Subscription which is for doing login.
    private _doQrLoginSubscription: Subscription;

    //#endregion

    //#region Constructor

    public constructor(@Inject('IQrLoginService') public qrLoginService: IQrLoginService,
                       public platform: Platform,
                       public toastController: ToastController,
                       private barcodeScanner: BarcodeScanner) {
        this._subscriptions = new Subscription();
    }

    //#endregion

    //#region Methods

    // Raised when component is initialized.
    public ngOnInit(): void {
    }

    // Raised when component is destroyed.
    public ngOnDestroy(): void {
        if (this._subscriptions != null && this._subscriptions.closed) {
            this._subscriptions.unsubscribe();
        }
    }

    // Use device camera and scan for qr code asynchronously.
    protected loadQrFromCameraAsync(): Observable<string> {

        const platforms = this.platform.platforms();
        const matchedPlatforms = platforms.filter(value => ['desktop'].includes(value));
        if (matchedPlatforms && matchedPlatforms.length) {
            return of('123445');
        }

        return from(this.barcodeScanner.scan())
            .pipe(
                map((barcodeScanResult) => barcodeScanResult.text)
            );

    }

    // Called when qr scanner is started.
    public ngOnQrScannerStarted(): void {

        let message: string = '';

        this._doQrLoginSubscription = this.loadQrFromCameraAsync()
            .pipe(
                flatMap((code) => {
                    message = 'Code has been scanned successfully';
                    return this.qrLoginService
                        .resolveQrLoginSessionAsync(code);
                }),
                catchError((error) => {
                    message = 'Cannot access to API server';
                    return throwError(error);
                }),
                finalize(() => {
                    this.toastController
                        .create({
                            duration: 2000,
                            position: 'top',
                            message
                        })
                        .then((addedToastMessage) => addedToastMessage.present())
                })
            )
            .subscribe();

        // Add the login subscription to watch list.
        this._subscriptions.add(this._doQrLoginSubscription);
    }

    //#endregion

}
