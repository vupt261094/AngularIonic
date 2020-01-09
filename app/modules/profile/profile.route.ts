import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {ImageCropperModule} from "ngx-image-cropper";

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [
        TranslateModule,
        IonicModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        ImageCropperModule
    ],
    exports: [
        ProfileComponent
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
        BarcodeScanner
    ]
})
export class ProfileRouteModule {
}
