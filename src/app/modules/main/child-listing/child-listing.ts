import {Component} from '@angular/core';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'child-listing',
  templateUrl: './child-listing.html',
})
export class ChildListingPage {

  //#region Properties

  private _users: Array<any>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._users = new Array<any>();

    for (let i = 0; i < 12; i++){
      this._users.push({
        photo: 'http://via.placeholder.com/512x512',
        username: `Username ${i}`
      });
    }
  }

  //#endregion

  //#region Method



  //#endregion
}
