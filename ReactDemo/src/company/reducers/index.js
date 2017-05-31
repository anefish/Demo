import { combineReducers } from 'redux'
import common from './common'
import search from './search'
import follow from './follow'
import input from './input'

const rootReducer = combineReducers({
    common,
    search,
    follow,
    input
})

export default rootReducer
