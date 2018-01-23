# Readable Project
This is a(nother) project for Udacity's React Fundamentals course.

It is a React application that is using Redux for state management and the purpose of it is to show understanding of redux...

It allows user to browse posts in categories, submit posts and comments and vote on it.

## Setting it up:
### Backend server
1. `git clone https://github.com/udacity/reactnd-project-readable-starter
1. Install dependencies: `npm install`
1. Start backend server: `npm start`

### Set up frontend server
1. Git clone my repo: `git clone https://github.com/whiteadi/reactnd-readable.git`
1. Install dependencies: `npm install`
1. Start frontend server: `npm start`

### Extra than udacity training used packages / modules / techniques 
1. Ducks: https://github.com/erikras/ducks-modular-redux - all redux specific stuff bundled together 
1. bindActionCreators from redux to pass an action creator directly to a component
in order to be able to invoke the actions from a component
1. combineReducers from redux (combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore)
1. FontIcon from material-ui's components http://www.material-ui.com/ react + Google'' material design
1. redux-form for managing form state in Redux https://redux-form.com/
1. Lodash cool features to work easier ;) https://lodash.com/
1. confirm modal dialog for deleting stuff https://github.com/gregthebusker/react-confirm-bootstrap
1. uuid - generate unique ids https://www.npmjs.com/package/uuid

Tried different ways to do same thing just to play with it, for example 
getting the props and actions to a component.





