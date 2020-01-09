import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainMasterLayoutComponent} from "./master-layout/main-master-layout.component";
import {ChildListingPage} from "./child-listing/child-listing";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {MessagePage} from "./message/message.component";
import {NotificationPage} from "./notification/notification";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: 'master-layout',
    component: MainMasterLayoutComponent,
    children: [
      {
        path: 'child-listing',
        pathMatch: 'full',
        component: ChildListingPage
      },
      {
        path: 'landing-page',
        pathMatch: 'full',
        component: LandingPageComponent
      },
      {
        path: 'message',
        pathMatch: 'full',
        component: MessagePage
      },
      {
        path: 'notification',
        pathMatch: 'full',
        component: NotificationPage
      },
      {
        path: '**',
        redirectTo: 'landing-page'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'master-layout'
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ChildListingPage,
    LandingPageComponent,
    MainMasterLayoutComponent,
    MessagePage,
    NotificationPage
  ],
  declarations: [
    ChildListingPage,
    LandingPageComponent,
    MainMasterLayoutComponent,
    MessagePage,
    NotificationPage
  ]
})
export class MainRouteModule {
}
