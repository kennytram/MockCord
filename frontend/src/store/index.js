import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serversReducer from "./servers";
import usersReducer from "./users";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import friendRequestsReducer from './FriendRequests';

const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serversReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  friendRequests: friendRequestsReducer,
  users: usersReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
