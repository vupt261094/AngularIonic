import {Component, OnInit} from '@angular/core';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'main-notification',
    templateUrl: './notification.html',
})
export class NotificationPage implements OnInit {

    //#region Properties

    public notification = [
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            action: "mentioned you in a comment",
            time: "5m"
        },
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            action: "mentioned you in a comment",
            time: "5m"
        },
        {
            src: "https://www.acfteambuilding.co.uk/images/activity_days/shooting/sniper.jpg",
            name: "Blue",
            action: "mentioned you in a comment",
            time: "5m"
        }];

    //#endregion

    //#region Constructor

    /*
    * Initialize page with injectors.
    * */
    constructor() {
    }

    //#endregion

    //#region Method

    /*
    * Called when component is initialized.
    * */
    public ngOnInit() {
    }


    //#endregion
}
