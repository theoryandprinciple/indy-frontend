import { combineReducers } from 'redux'
import counter from './counter'
import auth from './auth'
import app from './app'

export default combineReducers({
  counter,
  auth,
  app
})
