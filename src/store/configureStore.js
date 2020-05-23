// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Reactotron from '../../ReactotronConfig'
import rootReducer from './rootReducer'

export default function configureStore (): any {
  const middlewares = [thunk]
  const enhancers = []

  if (__DEV__) {
    middlewares.push(createLogger())
    enhancers.push(Reactotron.createEnhancer())
  }

  const enhancer = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  )

  return createStore(rootReducer, enhancer)
}
