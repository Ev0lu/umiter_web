import {createStore, combineReducers} from 'redux'
import { profileRegistrationReducer } from './profileRegistrationReducer'

const rootReducer = combineReducers({
    profileRegistrationReducer: profileRegistrationReducer
})

export const store = createStore(rootReducer)