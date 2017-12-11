import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom'
import {
    createStore,
    combineReducers,
    applyMiddleware } from 'redux'
import * as reducers from './reducers'
import createHistory from 'history/createBrowserHistory'

import App from './components/App/App.jsx'

const history = createHistory()
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(
        routerMiddleware(history)
    )
)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-root')
)
