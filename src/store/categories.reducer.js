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

import {getCategories} from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CATEGORIES = 'readable/categories/GET_CATEGORIES';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Fetch all categories
 */
const getAllCategories = () => (dispatch) => {
  getCategories()
    .then(categories => dispatch({
      type: GET_CATEGORIES,
      categories
    }));
};

/**
 * export the actions
 */
export const actions = {
  getAllCategories,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CATEGORIES]: (state, action) => action.categories
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = [], action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
