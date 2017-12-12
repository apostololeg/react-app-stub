import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router'
import PageTransition from 'react-router-page-transition'

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
        const { location } = this.props

        return (
            <div className='App'>
                <PageTransition timeout={200}>
                    <Switch location={location}>
                        <Route exact path='/' component={Search} />
                        <Route path='/people/:id' component={People} />
                    </Switch>
                </PageTransition>
            </div>
        )
    }
}

export default App
