// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Reactotron from '../../ReactotronConfig'

import rootReducer from './rootReducer'

export default function configureStore (): any {
  const middlewares = [thunk]

  if (__DEV__) {
    // middlewares.push(Reactotron.createEnhancer())

    const logger = createLogger()
    middlewares.push(logger)
  }

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  return createStore(rootReducer, enhancer)
}
