import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, ratings, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        ratings: ratings,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if(response.ok)
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errormsg = new Error(error.message);
        throw errormsg
    })
    .then((response) => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { 
        console.log('Post comments : ', error.message);
        alert('Error: ' + error.message);
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then((response) => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errormsg = new Error(error.message);
            throw errormsg
        })
        .then((response) => response.json())
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errormsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errormsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then((response) => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errormsg = new Error(error.message);
            throw errormsg
        })
        .then((response) => response.json())
        .then((comments) => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errormsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errormsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then((response) => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errormsg = new Error(error.message);
            throw errormsg
        })
        .then((response) => response.json())
        .then((promos) => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errormsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errormsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
        .then((response) => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errormsg = new Error(error.message);
            throw errormsg
        })
        .then((response) => response.json())
        .then((promos) => dispatch(addLeaders(promos)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errormsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errormsg
});

export const addLeaders = (promos) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: promos
});

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if(response.ok)
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errormsg = new Error(error.message);
        throw errormsg
    })
    .then((response) => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => { 
        console.log('Post feedback : ', error.message);
        alert('Error: ' + error.message);
    });
}