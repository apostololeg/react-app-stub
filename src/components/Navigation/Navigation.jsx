import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './Navigation.styl'

const mapStateToProps = ({ locations, router }) => ({
    locations,
    router
})

@connect(mapStateToProps)
class Navigation extends Component {
    render() {
        const {
            router,
            locations } = this.props

        return <div className='Navigation'>
            {locations.map(({ path, name }) => {
                const classes = classnames({
                    Navigation__link: true,
                    Navigation__link_current: path === router.location.pathname
                })

                return <Link
                    className={classes}
                    to={path}>
                    {name}
                </Link>
            })}
        </div>
    }
}

export default Navigation
