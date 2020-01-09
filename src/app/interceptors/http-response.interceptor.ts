import {Inject, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {from, throwError} from "rxjs";
import {IMessageBusService} from "../services/interfaces/message-bus-service.interface";
import {Storage} from '@ionic/storage';
import {StorageKeyConstant} from "../constants/storage-key.constant";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

    //#region Constructor

    /*
    * Initialize interceptor with injectors.
    * */
    public constructor(@Inject('IMessageBusService') public messageBusService: IMessageBusService,
                       public storage: Storage) {

    };

    //#endregion

    //#region Methods

    /*
    * Called when interceptor is intercepted.
    * */
    public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(httpRequest)
            .pipe(catchError((error: any) => {
                if (!(error instanceof HttpErrorResponse))
                    return;

                const httpResponseError = <HttpErrorResponse>error;
                switch (httpResponseError.status) {
                    case 401:
                        // Clear the access token from storage.
                        return from(this.storage
                            .remove(StorageKeyConstant.accessToken))
                            .pipe(() => {
                                return throwError(httpResponseError);
                            });
                }
                return throwError(httpResponseError);
            }));
    }


    //#endregion

}
