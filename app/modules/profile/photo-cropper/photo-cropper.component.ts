import {Component, Input} from "@angular/core";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
    selector: 'photo-cropper',
    templateUrl: 'photo-cropper.component.html',
    styleUrls: ['photo-cropper.component.scss']
})
export class PhotoCropperComponent {


    //#region Properties

    // By default, aspect ratio should be 1:1 (square image)
    private _aspectRatio = '1/1';

    // The file you want to change (set to null to reset the cropper)
    private _binaryImageFile: Blob | null = null;

    //#endregion

    //#region Accessors

    @Input('aspect-ratio')
    public set aspectRatio(value: string) {
        this._aspectRatio = value;
    }

    // Setup binary image file for cropper.
    @Input('binary-image-file')
    public set binaryImageFile(value: Blob | null) {
        this._binaryImageFile = value;
    }

    //#endregion

    //#region Constructor

    //#endregion

    //#region Methods

    /*
    * Called when image cropper is ready.
    * */
    public ngOnImageCropperReady(): void {

    }

    /*
    * Called when image is cropped successfully.
    * */
    public ngOnImageCropped(event: ImageCroppedEvent): void {

    }


    //#endregion
}
