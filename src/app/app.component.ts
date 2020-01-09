import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IMessageBusService} from "./services/interfaces/message-bus-service.interface";
import {MessageChannelConstant} from "./constants/message-channel.constant";
import {MessageEventConstant} from "./constants/message-event.constant";
import {HttpErrorResponse} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {StorageKeyConstant} from "./constants/storage-key.constant";
import {from, SubscriptionLike} from "rxjs";
import {finalize, flatMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.html'
})
export class AppComponent implements OnInit, OnDestroy {

    //#region Properties

    // Subscription to hook to failed http message.
    private _hookFailedHttpMessageSubscription: SubscriptionLike;

    //#endregion

    //#region Constructor

    /*
    * Initialize component with injectors.
    * */
    public constructor(public platform: Platform,
                       public statusBar: StatusBar,
                       public splashScreen: SplashScreen,
                       public translateService: TranslateService,
                       public router: Router,
                       @Inject('IMessageBusService') public messageBusService: IMessageBusService) {

        platform.ready()
            .then(() => {

                // Use en-US.
                translateService.setDefaultLang('en-US');

                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();
            });
    }

    //#endregion

    //#region Methods

    /*
    * Called when component is initialized.
    * */
    public ngOnInit(): void {

        window['handleOpenURL'] = (url: string) => {
            console.log("received url: " + url);
        }
    }

    // Called when component is destroyed.
    public ngOnDestroy(): void {

        if (this._hookFailedHttpMessageSubscription && !this._hookFailedHttpMessageSubscription.closed) {
            this._hookFailedHttpMessageSubscription.unsubscribe();
        }
    }

    //#endregion

}

