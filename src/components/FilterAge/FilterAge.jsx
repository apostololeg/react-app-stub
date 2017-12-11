import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

class FilterAge extends Component {
    onChange(data) {
        const {
            from,
            to,
            onChange } = this.props

        onChange({ from, to, ...data })
    }

    _renderInput(type, defaultValue) {
        const inputProps = {
            type: 'number',
            style: { width: '3em' },
            defaultValue,
            inputProps: {
                min: 1,
                style: { textAlign: 'right' }
            },
            onChange: e => this.onChange({
                [type]: parseInt(e.target.value)
            })
        }

        return <TextField {...inputProps}/>
    }

    render() {
        const { from, to } = this.props

        return <div className='FilterAge'>
            age from
            {this._renderInput('from', from)}
            to
            {this._renderInput('to', to)}
        </div>
    }
}

export default FilterAge
