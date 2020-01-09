import {ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot} from "@angular/router";
import {UserViewModel} from "../view-models/user.view-model";
import {Inject, Injectable} from "@angular/core";
import {from, Observable, throwError} from "rxjs";
import {IUserService} from "../services/interfaces/user-service.interface";
import {LoadingController} from "@ionic/angular";
import {catchError, finalize, flatMap} from "rxjs/operators";
import {StorageKeyConstant} from "../constants/storage-key.constant";
import {Storage} from '@ionic/storage';

@Injectable()
export class ProfileResolve implements Resolve<UserViewModel> {

    //#region Constructor

    public constructor(@Inject('IUserService') public userService: IUserService,
                       public storage: Storage,
                       public loadingController: LoadingController, public router: Router) {

    }

    //#endregion

    //#region Methods

    // Resolve profile information.
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserViewModel> | Promise<UserViewModel> | UserViewModel {

        let loaderInstance = null;

        return from(this.loadingController.create({}))
            .pipe(
                flatMap(loader => {
                    loaderInstance = loader;

                    // Display loader instance.
                    loaderInstance.present();

                    return this.userService
                        .loadProfileAsync()
                }),
                catchError(_ => {

                    this.storage
                        .remove(StorageKeyConstant.accessToken);

                    return from(this.router.navigate(['/login']))
                        .pipe(
                            flatMap(_ => throwError('No profile has been found'))
                        );
                }),
                finalize(() => {
                    loaderInstance.dismiss();
                })
            );
    }

    //#endregion

}
