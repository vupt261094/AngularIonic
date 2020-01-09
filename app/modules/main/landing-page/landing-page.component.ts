import {Component, Inject} from '@angular/core';

@Component({
    selector: 'landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['landing-page.component.scss']
})

export class LandingPageComponent {

    //#region Constructor

    /*
    * Initialize page with injectors.
    * */
    public constructor() {
    }

    //#endregion

    //#region Methods

    /*
    * Called when child profile is clicked.
    * */
    public clickChildProfile() {
    }

    //#endregion
}
