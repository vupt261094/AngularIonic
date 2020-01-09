import {UserStatuses} from "../enums/user-status.enum";

export class UserViewModel {

    //#region Properties

    public id: string;

    public username: string;

    public password: string;

    public email: string;

    public birthday: number;

    public status: UserStatuses;

    public joinedTime: number;

    public lastModifiedTime: number | null;

    //#endregion

    //#region Constructor

    public constructor() {
        this.id = null;
        this.username = null;
        this.password = null;
        this.email = null;
        this.birthday = null;
        this.status = UserStatuses.disabled;
        this.joinedTime = null;
        this.lastModifiedTime = null;
    }

    //#endregion

}
