export class LoginResultViewModel {

    //#region Properties

    public accessToken: string;

    public lifetime: number;

    public tokenType: string;

    public refreshToken: string;

    //#endregion

    //#region Constructor

    public constructor() {
        this.accessToken = '';
        this.lifetime = 0;
        this.tokenType = '';
        this.refreshToken = '';
    }

    //#endregion

}
