import React from 'react'

import './ContactLink.styl'
import IconPhone from 'material-ui-icons/Phone'
import IconMail from 'material-ui-icons/MailOutline'

const getIcon = type => {
    const props = {
        className: 'ContactLink__icon',
        style: { marginRight: 5 }
    }

    switch(type) {
        case 'phone':
            return <IconPhone {...props}/>
        case 'email':
            return <IconMail {...props}/>
    }
}

const getProtocol = type => {
    switch(type) {
        case 'phone':
            return 'tel:'
        case 'email':
            return 'mailto:'
        default:
            return ''
    }
}

const ContactLink = ({ type, text }) => (
    <div className='ContactLink'>
        {getIcon(type)}
        <a className='ContactLink__link' href={`${getProtocol(type)}${text}`}>{text}</a>
    </div>
)

export default ContactLink
