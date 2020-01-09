import {NgModule} from '@angular/core';
import {LoginRouteModule} from "./login.route";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {GooglePlus} from "@ionic-native/google-plus/ngx";
import {Facebook} from "@ionic-native/facebook/ngx";
import {SecureStorage} from '@ionic-native/secure-storage/ngx';

@NgModule({
    imports: [
        LoginRouteModule
    ],
    providers: [ 
        InAppBrowser,
        GooglePlus,
        Facebook,
        SecureStorage
    ]
})

export class LoginModule {
}
