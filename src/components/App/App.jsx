import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    createMuiTheme,
    MuiThemeProvider } from 'material-ui/styles'
import { teal } from 'material-ui/colors'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter } from 'react-router'
import PageTransition from 'react-router-page-transition'

import { request } from '../../utils'
import { setPeoples } from '../../actions'

import './App.styl'
import Search from '../Search/Search.jsx'
import People from '../People/People.jsx'

const theme = createMuiTheme({
    palette: {
        primary: teal
    }
})

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
            <MuiThemeProvider theme={theme}>
                <div className='App'>
                    <PageTransition timeout={200}>
                        <Switch location={location}>
                            <Route exact path='/' component={Search} />
                            <Route path='/people/:id' component={People} />
                        </Switch>
                    </PageTransition>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App
