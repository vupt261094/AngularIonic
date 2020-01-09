import * as _ from 'lodash';
import { createFeatureSelector, createSelector, Action } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.action';
import * as FromRoot from './app.state';

export interface PayLoadAction extends Action {
    payload: any;
}

export interface AppState extends FromRoot.State {
    showSpinner: boolean;
}
const initialState: AppState = {
    showSpinner: false,
};

const getAppFeatureState = createFeatureSelector<AppState>('app');

// export const getShowSpinner = createSelector(
//     getAppFeatureState,
//     state => state.showSpinner
// );

export function AppReducer(state = initialState, action: PayLoadAction) {
    switch (action.type) {
        case AppActionTypes.ShowSpinner:
            return {
                ...state,
                showSpinner: true
            };
    }
    return state;
}
