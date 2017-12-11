import React from 'react'
import { Link } from 'react-router-dom'

import './SuggestPeople.styl'

const SuggestPeople = ({ data, action, className }) => (
    <div className={'SuggestPeople ' + className}>
        {data.map(item => {
            const {
                id,
                birth,
                name,
                sex,
                worksFor } = item

            const yo = new Date().getFullYear() - new Date(birth).getFullYear()

            return <Link className='SuggestPeople__item' key={id}
                to={`${action}/${id}`}>
                {name}
                <div className='SuggestPeople__description'>
                    {sex}, {yo}y.o., works for {worksFor}
                </div>
            </Link>
        })}
    </div>
)

export default SuggestPeople
