import {NgModule} from '@angular/core';
import {AboutUsPage} from './about-us';
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: AboutUsPage
  }
];

@NgModule({
  declarations: [
    AboutUsPage
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AboutUsPage
  ]
})

export class AboutUsModule {
}
