import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {from, Observable} from "rxjs";
import {StorageKeyConstant} from "../constants/storage-key.constant";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class LoginGuard implements CanActivate {

    //#region Constructor

    public constructor(public storage: Storage, public router: Router) {

    }

    //#endregion

    //#region Methods

    // Check whether login route can be activated or not.
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return from(this.storage
            .get(StorageKeyConstant.accessToken))
            .pipe(map((accessToken: string) => {
                if (!accessToken || !accessToken.length) {
                    return true;
                }

                return this.router
                    .parseUrl('/main');
            }));
    }

    //#endregion
}
