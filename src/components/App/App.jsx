import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router'

import { request } from '../../utils'
import { setPeoples } from '../../actions'

import './App.styl'
import Search from '../Search/Search.jsx'
import People from '../People/People.jsx'

@withRouter
@connect(() => ({}))
class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        request('./friends.json')
            .then(data => dispatch(setPeoples(data)))
    }

    render() {
        return (
            <div className='App'>
                <Route exact path='/' component={Search} />
                <Route path='/people/:id' component={People} />
            </div>
        )
    }
}

export default App
