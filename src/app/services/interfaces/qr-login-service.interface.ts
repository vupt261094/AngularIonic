import {Observable} from "rxjs";

export interface IQrLoginService {

    //#region Methods

    // Resolve qr login session by exchanging session id with server.
    resolveQrLoginSessionAsync(sessionId: string): Observable<void>;

    //#endregion

}
