import { Action } from '@ngrx/store';

export enum AppActionTypes {
    ShowSpinner = '[App] Show Spinner',
}

export class ShowSpinner implements Action {
    readonly type = AppActionTypes.ShowSpinner;
    constructor(public payload: any) { }
}

export type AppActions = ShowSpinner
    ;
