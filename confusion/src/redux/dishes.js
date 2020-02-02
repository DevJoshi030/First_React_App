import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
        isLoading: true,
        errormsg: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errormsg: null, dishes: action.payload}

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errormsg: null, dishes: []};

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errormsg: action.payload};
            
        default:
            return state;
    }
}