/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [];
middlewares.push(thunk);

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middlewares.push(logger);
// }


export default function configureStore(initialState = {}) {
  // const store = createStore(
  //   reducer,
  //   compose(
  //     applyMiddleware(thunk),
  //     DevTools.instrument()
  //   )
  // )
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  //const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(() => console.log('store.getState', store.getState()))

  // Stop listening to state updates
  //unsubscribe()

  return store;
}

