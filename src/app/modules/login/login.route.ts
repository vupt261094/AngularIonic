import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import {TranslateModule} from "@ngx-translate/core";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        TranslateModule,
        IonicModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        LoginComponent
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginRouteModule {
}
