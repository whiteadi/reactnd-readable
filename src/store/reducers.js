import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import posts from './posts.reducer';
import comments from './comments.reducer';
import categories from './categories.reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    posts,
    categories,
    comments,
    form: formReducer,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
