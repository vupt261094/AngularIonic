import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController, NavController} from "@ionic/angular";
import {Storage} from '@ionic/storage';
import {StorageKeyConstant} from "../../../constants/storage-key.constant";
import {from} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {UserViewModel} from "../../../view-models/user.view-model";
import {MainMasterLayoutRouteData} from "../../../models/main-master-layout.route-data";

@Component({
    selector: 'main-master-layout',
    templateUrl: './main-master-layout.component.html',
    styleUrls: ['main-master-layout.component.scss']
})

export class MainMasterLayoutComponent implements OnInit {


    //count notification

    public countNotification: string;
    public countMessage: string;

    // Profile information.
    private _profile: UserViewModel = {
        username: '',
        id: '',
        birthday: null,
        email: null, 
        joinedTime: null,
        lastModifiedTime: null,
        password: null,
        status: null

    };

    // Get profile.
    public get profile(): UserViewModel {
        return this._profile;
    }

    //#region Properties

    //#endregion

    //#region Constructor

    /*
    * Initialize page with injectors.
    * */
    public constructor(public router: Router,
                       public storage: Storage,
                       public navController: NavController,
                       public menuController: MenuController,
                       public activatedRoute: ActivatedRoute) {
    }

    //#endregion

    //#region Methods

    // Called when component is initialized.
    public ngOnInit(): void {

        this.activatedRoute
            .data
            .subscribe((data: MainMasterLayoutRouteData) => {
                this._profile = data.profile;
            });
    }

    /*
    * Called when menu toggle button is clicked.
    * */
    public ngMenuToggleClicked(): void {
        this.menuController
            .toggle('master-layout-menu');
    }

    // Called when landing page is clicked.
    public ngOnLandingPageClicked(): void {
        this.router.navigate(['./main/landing-page']);
    };

    // Called when sign out button is clicked.
    public clickSignOut() {

        // CLear access token.
        from(this.storage
            .remove(StorageKeyConstant.accessToken))
            .pipe(flatMap(() => {
                return from(this.router
                    .navigateByUrl('/login'));
            }))
            .subscribe();

    }

    // Called when about us menu item is clicked.
    public clickAboutUs() {
        // this.navigationController.push(AboutUsPage);
    }

    // Called when be a volunteer item is clicked.
    public clickBeVolunteer() {
        // this.navigationController.push(BeVolunteerPage);
    }

    // Called when child listing menu item is clicked.
    public clickChildListing() {
        // this.navigationController.push(ChildListingPage);
        this.navController
            .navigateForward('/main/master-layout/child-listing');
    }

    // Called when my favourite menu item is clicked.
    public clickMyFavourites() {
        // this.navigationController.push(MyFavouritesPage);
    }

    // Called when my track records menu item is clicked.
    public clickMyTrackRecords() {
        // this.navigationController.push(MyTrackRecordsPage);
    }

    // Called when guardian menu item is clicked.
    public clickGuardian() {
        // this.navigationController.push(GuardianProfilePage);
    }

    // Called when qr login option is clicked.
    public ngOnQrLoginClicked(): void {
        this.router.navigateByUrl('/profile/photo-cropper');

    }

    //#endregion
}
