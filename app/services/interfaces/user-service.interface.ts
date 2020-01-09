import {Observable} from "rxjs";
import {BasicLoginViewModel} from "../../view-models/basic-login.view-model";
import {UserViewModel} from "../../view-models/user.view-model";
import {LoginResultViewModel} from "../../view-models/login-result.view-model";

export interface IUserService {

    //#region Methods

    // Basic login asynchronously.
    basicLoginAsync(model: BasicLoginViewModel): Observable<LoginResultViewModel>;

    // Login Google asynchronously.
    loginGoogleAsync(): Observable<LoginResultViewModel>;

    // Login facebook asynchronously.
    loginFacebookAsync(): Observable<LoginResultViewModel>;

    // Get current requested user profile.
    loadProfileAsync(): Observable<UserViewModel>;

    //#endregion
}
