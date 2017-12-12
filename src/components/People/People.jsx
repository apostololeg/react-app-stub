import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import './People.styl'
import IconUser from 'material-ui-icons/AccountCircle'
import IconClose from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import ContactLink from '../ContactLink/ContactLink.jsx'

@withRouter
@connect(({
    peoples,
    history
}) => ({
    peoples,
    history
}))
class People extends Component {
    _getData() {
        const {
            match,
            peoples } = this.props
        const { id } = match.params

        return peoples.find(data => data.id === id)
    }

    _renderTable(data) {
        const {
            name,
            sex,
            birth,
            worksFor,
            phone,
            email } = data

        const yo = new Date().getFullYear() - new Date(birth).getFullYear()
        const tableData = [
            {
                name: 'birth',
                value: `${birth}, ${yo}y.o.`
            },
            {
                name: 'phone',
                value: <ContactLink type='phone' text={phone}/>
            },
            {
                name: 'email',
                value: <ContactLink type='email' text={email}/>
            }
        ]

        return <div className='People__table'>
            {tableData.map(({ name, value }) => <div className='People__table-row' key={name}>
                <div className='People__table-key'>{name}</div>
                <div className='People__table-value'>{value}</div>
            </div>)}
        </div>
    }

    render() {
        const data = this._getData()
        const {
            name,
            worksFor } = data

        return <div className='People transition-item'>
            <div className='People__inner'>
                <Link className='People__close' to='/'>
                    <IconButton><IconClose/></IconButton>
                </Link>
                <div className='People__avatar'>
                    <IconUser color='disabled' style={{ height: 130, width: 130 }} />
                </div>
                <div className='People__title'>{name}</div>
                <div className='People__subtitle'>{worksFor}</div>
                {this._renderTable(data)}
            </div>
        </div>
    }
}

export default People
