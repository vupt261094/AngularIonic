import {RouterModule, Routes} from "@angular/router";
import {AppStartComponent} from "./app-start.component";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: AppStartComponent
    }
];

@NgModule({
    declarations: [
        AppStartComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        AppStartComponent
    ]
})

export class AppStartRouteModule {
}
