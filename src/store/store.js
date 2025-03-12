import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import { toyReducer } from './reducers/toyReducer.js'
import { userReducer } from './reducers/userReducer.js'

export const store = configureStore({
    reducer: {
        toyModule: toyReducer,
        userModule: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

console.log('📢 Redux Store Initialized:', store.getState())