import {NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../factories/ngx-translation.factory";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ServiceModule} from "../services/service.module";

@NgModule({
    imports: [
        // Import application services.
        ServiceModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicStorageModule.forRoot()
    ],
    exports: [
        ServiceModule,
        HttpClientModule,
        TranslateModule,
        IonicStorageModule
    ]
})
export class SharedModule {
}
