import React from 'react'
import classnames from 'classnames'
import './FilterSex.styl'

const FilterSex = ({ active, onChange }) => <div className='FilterSex'>
    {['male', 'female', null].map(value => {
        const classes = classnames({
            FilterSex__item: true,
            FilterSex__item_active: active === value
        })

        return <div className={classes} onClick={() => onChange(value)}>
            {value || 'not specifyed'}
        </div>
    })}
</div>

export default FilterSex
