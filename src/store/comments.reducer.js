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

import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COMMENTS = 'readable/comments/GET_COMMENTS';
export const UPVOTE_COMMENTS = 'readable/comments/UPVOTE_COMMENTS';
export const DOWNVOTE_COMMENTS = 'sm-readable/comments/DOWNVOTE_COMMENTS';
export const CREATE_COMMENT = 'readable/comments/CREATE_COMMENT';
export const SORT_COMMENTS = 'readable/comments/SORT_COMMENTS';
export const DELETE_COMMENT = 'readable/comments/DELETE_COMMENT';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Get all comments
 */
export const getAllComments = (postId) => (dispatch) => {
  getComments(postId)
    .then(comments => dispatch({
      type: GET_COMMENTS,
      comments,
      postId
    }));
};

/**
 * Upvote on a comment
 */
const voteUp = (id) => (dispatch) => {
  voteComment(id, 'upVote')
    .then(comment => dispatch(getAllComments(comment.parentId)));
};

/**
 * Downvote on a comment
 */
const voteDown = (id) => (dispatch) => {
  voteComment(id, 'downVote')
    .then(comment => dispatch(getAllComments(comment.parentId)));
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
  const postId = comments[0].parentId;
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
    type: SORT_COMMENTS,
    comments: sortedComments,
    postId
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
  deleteThisComment
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_COMMENTS]: (state, action) => {
    const newState = state;
    newState[action.postId] = action.comments;
    return newState;
  },
  [CREATE_COMMENT]: (state, action) => {
    const newState = state;
    newState[action.comment.parentId].push(action.comment);
    return newState;
  },
  [SORT_COMMENTS]: (state, action) => {
    const newState = state;
    newState[action.postId] = action.comments;
    return newState;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
