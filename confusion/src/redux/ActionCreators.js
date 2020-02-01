import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, ratings, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        ratings: ratings,
        author: author,
        comment: comment
    }
});