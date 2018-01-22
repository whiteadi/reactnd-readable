/*
 * This reducer follows the Ducks budling style
 * see https://github.com/erikras/ducks-modular-redux
 * basic rules:
 * - MUST export default a function called reducer()
 * - MUST export its action creators as functions
 * - MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
 * - MAY export its action types as UPPER_SNAKE_CASE, if an external reducer
 *   needs to listen for them, or if it is a published reusable library
 */

import {createComment, deleteComment, getComments, voteComment} from '../utils/api';
import {sortAsc, sortAscNum, sortDesc, sortDescNum} from '../utils/helper';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COMMENTS = 'readable/comments/GET_COMMENTS';
export const CREATE_COMMENT = 'readable/comments/CREATE_COMMENT';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Get all comments 4 a post
 */
const getAllComments = (postId) => (dispatch) => {
  getComments(postId)
    .then(comments => dispatch({
      type: GET_COMMENTS,
      comments
    }));
};

/**
 * Upvote on a comment
 */
const voteUp = (id, postId) => (dispatch) => {
  voteComment(id, 'upVote')
    .then(comment => dispatch(getAllComments(postId)));
};

/**
 * Downvote on a comment
 */
const voteDown = (id, postId) => (dispatch) => {
  voteComment(id, 'downVote')
    .then(comment => dispatch(getAllComments(postId)));
};

/**
 * Create a new comment
 */
const newComment = (data) => (dispatch) => {
  createComment(data)
    .then(comment => dispatch({
      type: CREATE_COMMENT,
      comment
    }));
};

/**
 * Delete a comment
 */
const deleteThisComment = (id, postId) => (dispatch) => {
  deleteComment(id)
    .then(() => dispatch(getAllComments(postId)));
};

/**
 *
 * @param comments
 * @param sortBy
 * @returns {function(*)}
 */
const doTheSort = (comments, sortBy) => (dispatch) => {
  let sortedComments = [];
  switch (sortBy) {
    case 'date_asc':
      sortedComments = sortAsc(comments, 'timestamp');
      break;
    case 'date_desc':
      sortedComments = sortDesc(comments, 'timestamp');
      break;
    case 'vote_asc':
      sortedComments = sortAscNum(comments, 'voteScore');
      break;
    case 'vote_desc':
      sortedComments = sortDescNum(comments, 'voteScore');
      break;
    default:
      break;
  }
  dispatch({
    type: GET_COMMENTS,
    comments: sortedComments
  });
};

/**
 * export the actions
 */
export const actions = {
  voteUp,
  voteDown,
  newComment,
  doTheSort,
  deleteThisComment,
  getAllComments
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_COMMENTS]: (state, action) => action.comments,
  [CREATE_COMMENT]: (state, action) => [
    ...state,
    action.comment
  ]
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
