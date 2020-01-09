import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import {Injectable} from "@angular/core";
import {HttpHeaderConstant} from "../constants/http-header.constant";
import {StorageKeyConstant} from "../constants/storage-key.constant";
import {catchError, flatMap, map} from "rxjs/operators";
import {from} from "rxjs";
import {Storage} from '@ionic/storage';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    //#region Constructor

    /*
    * Initialize interceptor with injectors.
    * */
    constructor(public storage: Storage) {
    }

    //#endregion

    //#region Methods

    /*
    * Called when request is intercepted.
    * */
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Get access token from local storage.
        return from(this.storage
            .get(StorageKeyConstant.accessToken))
            .pipe(
                flatMap((accessToken: string) => {
                    // Access token is not found in the local storage.
                    // Skip setting it.
                    if (!accessToken) {
                        return next.handle(httpRequest);
                    }

                    const clonedRequest = httpRequest.clone({
                        headers: httpRequest.headers.set(HttpHeaderConstant.authorization, `Bearer ${accessToken}`)
                    });

                    return next.handle(clonedRequest);
                }),
                catchError(() => {
                    return next.handle(httpRequest);
                })
            );
    }

    //#endregion
}
