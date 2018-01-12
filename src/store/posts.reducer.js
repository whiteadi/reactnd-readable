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

import _ from 'lodash';

import {createPost, deletePost, editPost, getPosts, votePost, getPost} from '../utils/api';
import {sortAsc, sortDesc,sortAscNum, sortDescNum} from '../utils/helper';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_POSTS = 'readable/posts/GET_POSTS';
export const UPVOTE_POST = 'readable/posts/UPVOTE_POST';
export const DOWNVOTE_POST = 'sm-readable/posts/DOWNVOTE_POST';
export const CREATE_POST = 'readable/posts/CREATE_POST';
export const EDIT_POST = 'readable/posts/EDIT_POST';
export const SORT_POST = 'readable/posts/SORT_POST';
export const DELETE_POST = 'readable/posts/DELETE_POST';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Get all posts
 */
const getAllPosts = () => (dispatch) => {
  getPosts()
    .then(posts => dispatch({
      type: GET_POSTS,
      posts
    }));
};

/**
 * Upvote on a post
 */
const voteUp = (id) => (dispatch) => {
  votePost(id, 'upVote')
    .then(post => dispatch({
      type: UPVOTE_POST,
      post
    }));
};

/**
 * Downvote on a post
 */
const voteDown = (id) => (dispatch) => {
  votePost(id, 'downVote')
    .then(post => dispatch({
      type: DOWNVOTE_POST,
      post
    }));
};

/**
 * Create a new post
 */
const newPost = (data) => (dispatch) => {
  createPost(data)
    .then(post => dispatch({
      type: CREATE_POST,
      post
    }));
};

/**
 * Edit a post
 */
const changePost = (id, data) => (dispatch) => {
  editPost(id, data.title, data.body)
    .then(post => dispatch({
      type: EDIT_POST,
      post
    }));
};

/**
 * Delete a post
 */
const deleteThisPost = (id) => (dispatch) => {
  deletePost(id)
    .then(() => dispatch({
      type: DELETE_POST,
      id
    }));
};

/**
 * Get a post by id
 */
const fetchPostById = (id) => (dispatch) => {
  getPost(id)
    .then((post) => post);
};

/**
 *
 * @param posts
 * @param sortBy
 * @returns {function(*)}
 */
export const doTheSort = (posts, sortBy) => (dispatch) => {
  let sortedPosts = [];
  switch (sortBy) {
    case 'date_asc':
      sortedPosts = sortAsc(posts, 'timestamp');
      break;
    case 'date_desc':
      sortedPosts = sortDesc(posts, 'timestamp');
      break;
    case 'vote_asc':
      sortedPosts = sortAscNum(posts, 'voteScore');
      break;
    case 'vote_desc':
      sortedPosts = sortDescNum(posts, 'voteScore');
      break;
    default:
      break;
  }
  dispatch({
    type: SORT_POST,
    posts: sortedPosts
  });
};

/**
 * export the actions
 */
export const actions = {
  getAllPosts,
  voteUp,
  voteDown,
  newPost,
  changePost,
  doTheSort,
  deleteThisPost,
  fetchPostById,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_POSTS]: (state, action) => action.posts,
  [UPVOTE_POST]: (state, action) => state.map(post => {
    if (post.id === action.post.id) {
      return action.post;
    } else {
      return post;
    }
  }),
  [DOWNVOTE_POST]: (state, action) => state.map(post => {
    if (post.id === action.post.id) {
      return action.post;
    } else {
      return post;
    }
  }),
  [CREATE_POST]: (state, action) => [
    ...state,
    action.post
  ],
  [EDIT_POST]: (state, action) => state.map(post => {
    if (post.id === action.post.id) {
      return {...action.post};
    } else {
      return post;
    }
  }),
  [SORT_POST]: (state, action) => action.posts,
  [DELETE_POST]: (state, action) => _.filter(state, post => post.id !== action.id)
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
