import * as ActionTypes from './ActionTypes';

export const InitialFeedback = (state = {
        feedback: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            alert("Feedback : " + JSON.stringify(feedback));
            console.log("Feedback : " + JSON.stringify(feedback));
            return {...state, feedback: state.feedback.concat(feedback)}

        default:
            return state;
    }
}
