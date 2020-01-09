import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {AppComponent} from './app.component';
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {RouteReuseStrategy} from "@angular/router";
import {AppConfigService} from "./services/implementations/app-config.service";
import {appConfigServiceFactory} from "./factories/app-config.factory";
import {AppRouteModule} from "./app.route";
import {SharedModule} from "./modules/shared.module";
import { environment } from '../environments/environment';

// NgRx Store import
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppReducer } from './states/app.reducer';

@NgModule({
    entryComponents: [],
    declarations: [
        AppComponent
    ],
    imports: [
        IonicModule.forRoot(),
        BrowserModule,
        AppRouteModule,
        SharedModule,
        StoreModule.forRoot({
            app: AppReducer
        }),
        StoreDevtoolsModule.instrument({
            name: 'TPG Devtools',
            maxAge: 25,
            logOnly: environment.production
        }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appConfigServiceFactory,
            multi: true,
            deps: [AppConfigService]
        },
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})

//#endregion

export class AppModule {
}
