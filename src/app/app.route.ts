import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModule} from "./modules/login/login.module";
import {AppStartModule} from "./modules/app-start/app-start.module";
import {ProfileResolve} from "./resolves/profile.resolve";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpRequestInterceptor} from "./interceptors/http-request.interceptor";
import {LoginGuard} from "./guards/login.guard";
import {IonicStorageModule} from "@ionic/storage";
import {HttpResponseInterceptor} from "./interceptors/http-response.interceptor";
import {AppComponent} from "./app.component";
import {IonicModule} from "@ionic/angular";
import {SharedModule} from "./modules/shared.module";

const routes: Routes = [
    // {
    //   path: 'about-us',
    //   loadChildren: './modules/about-us/about-us.module#AboutUsModule'
    // },
    {
        path: 'app-start',
        loadChildren: './modules/app-start/app-start.module#AppStartModule'
    },
    // {
    //   path: 'child-profile',
    //   loadChildren: './modules/child-profile/child-profile.module#ChildProfileModule'
    // },
    // {
    //   path: 'guardian-profile',
    //   loadChildren: './modules/guardian-profile/guardian-profile.module#GuardianProfileModule'
    // },
    {
        path: 'login',
        canActivate: [LoginGuard],
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: '',
        // resolve: {
        //     profile: ProfileResolve
        // },
        children: [
            {
                path: 'main',
                loadChildren: './modules/main/main.module#MainModule'
            },
            {
                path: 'profile',
                loadChildren: './modules/profile/profile.module#ProfileModule'
            }
        ]
    },
    // {
    //   path: 'my-favorites',
    //   loadChildren: './modules/my-favorite/my-favorite.module#MyFavoriteModule'
    // },
    // {
    //   path: 'my-track-records',
    //   loadChildren: './modules/my-track-records/my-track-records.module#MyTrackRecordsModule'
    // },
    // {
    //   path: 'top-donator',
    //   loadChildren: './modules/top-donator/top-donator.module#TopDonatorModule'
    // },
    // {
    //   path: 'volunteer',
    //   loadChildren: './modules/volunteer/volunteer.module#VolunteerModule'
    // }
    {
        path: '**',
        loadChildren: './modules/app-start/app-start.module#AppStartModule'
    }
];

@NgModule({
    imports: [
        IonicModule.forRoot(),
        SharedModule,
        AppStartModule,
        LoginModule,
        RouterModule.forRoot(routes, {enableTracing: false})
    ],
    providers: [
        ProfileResolve,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpResponseInterceptor,
            multi: true
        },
        LoginGuard
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouteModule {
}
