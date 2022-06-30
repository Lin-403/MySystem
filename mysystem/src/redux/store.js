import { CollapsedReducer } from "./reducers/CollapsedReducer"
import {combineReducers ,createStore} from 'redux'

const reducer=combineReducers({
    CollapsedReducer,
})

const store=createStore(reducer)

export default store