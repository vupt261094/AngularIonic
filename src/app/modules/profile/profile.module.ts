import {NgModule} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ProfileRouteModule} from "./profile.route";


@NgModule({
  imports: [
    TranslateModule,
    ProfileRouteModule
  ],
  providers: [

  ]
})

export class ProfileModule {
}
