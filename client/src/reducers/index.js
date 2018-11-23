import { combineReducers } from 'redux'
import loanReducer from './loanReducer'

export default combineReducers({
  item: loanReducer
})
