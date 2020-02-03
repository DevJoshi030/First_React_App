import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
        isLoading: true,
        errormsg: null,
        leaders: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errormsg: null, leaders: action.payload}

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errormsg: null, leaders: []};

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errormsg: action.payload};

        default:
            return state;
    }
}