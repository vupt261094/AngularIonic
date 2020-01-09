import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {from} from "rxjs";
import {finalize, flatMap} from "rxjs/operators";

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'app-start',
    templateUrl: 'app-start.html'
})
export class AppStartComponent {

    //#region Constructor

    public constructor(public router: Router,
                       public loadingController: LoadingController) {

    }

    //#endregion

    //#region Methods

    // Called when start button is clicked.
    private ngOnStartClicked(): void {

        let loaderControl = null;
        this.loadingController
            .create({})
            .then(loader => {

                // Temporarily save loader component.
                loaderControl = loader;

                // Present loader.
                loader.present();
                return this.router
                    .navigate(['/login'], {replaceUrl: true});
            })
            .then(_ => {
                loaderControl.dismiss();
            })
            .catch(_ => {
                loaderControl.dismiss();
            });
    }


    //#endregion
}
