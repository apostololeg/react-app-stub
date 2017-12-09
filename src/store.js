import {
    createStore,
    combineReducers,
    applyMiddleware } from 'redux'
import {
    routerReducer,
    routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

console.log('reducers', reducers)

const history = createHistory()

const store = createStore(
    combineReducers({ routerReducer, ...reducers }),
    applyMiddleware(
        thunk,
        routerMiddleware(history)
    )
);
