import {
  createStore,
  applyMiddleware,
  compose,
  StoreEnhancer,
  Middleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reactotron from '../ReactotronConfig';
import rootReducer from './rootReducer';

export default function configureStore(): any {
  const middlewares: Middleware[] = [thunk];
  const enhancers: StoreEnhancer[] = [];

  if (__DEV__ && Reactotron.createEnhancer) {
    middlewares.push(createLogger());
    enhancers.push(Reactotron.createEnhancer());
  }

  const enhancer = compose(applyMiddleware(...middlewares), ...enhancers);

  return createStore(rootReducer, enhancer as StoreEnhancer);
}
