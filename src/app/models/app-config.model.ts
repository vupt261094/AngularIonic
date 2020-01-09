export class AppConfigModel {

    //#region Properties

    public baseUrl: string;

    public clientId: string;

    public clientSecret: string;

    //#endregion

    //#region Constructor

    public constructor() {
        this.baseUrl = '';
        this.clientId = '';
        this.clientSecret = '';
    }

    //#endregion
}
