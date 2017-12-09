import React, { Component } from 'react'
import { connect } from 'react-redux'

import { testAction } from '../../actions'

const mapStateToProps = ({ test }) => ({
    test
})

@connect(mapStateToProps)
class Test extends Component {
    constructor(props) {
        super(props)

        this._bindCtx()
    }

    _bindCtx() {
        [
            '_onButtonClick',
        ].map(fn => this[fn] = this[fn].bind(this))
    }

    _onButtonClick() {
        const { dispatch } = this.props

        dispatch(testAction((Math.random() * 10).toFixed()))
    }

    render() {
        const { test } = this.props

        return <div className='Test'>
            {test}
            <button onClick={this._onButtonClick}>click me!</button>
        </div>
    }
}

export default Test
