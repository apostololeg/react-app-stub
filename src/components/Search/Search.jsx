import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { setFilter } from '../../actions'

import './Search.styl'
import TextField from 'material-ui/TextField'
import FilterSex from '../FilterSex/FilterSex.jsx'
import FilterAge from '../FilterAge/FilterAge.jsx'
import SuggestPeople from '../SuggestPeople/SuggestPeople.jsx'

@connect(({
    filter,
    peoples
}) => ({
    filter,
    peoples
}))
class Search extends Component {
    constructor(props) {
        super(props)
        this._bindCtx()
    }

    _bindCtx() {
        [
            '_onQueryChange',
            '_onFilterSexChange',
            '_onFilterAgeChange',
            '_onFilterWorksForChange'
        ].map(fn => this[fn] = this[fn].bind(this))
    }

    _setFilter(data) {
        const { dispatch } = this.props

        dispatch(setFilter(data))
    }

    _onQueryChange({ target }) {
        this._setFilter({ query: target.value })
    }

    _onFilterSexChange(sex) {
        this._setFilter({ sex })
    }

    _onFilterAgeChange({ from, to }) {
        this._setFilter({
            ageFrom: from,
            ageTo: to
        })
    }

    _onFilterWorksForChange({ target }) {
        this._setFilter({ worksFor: target.value })
    }

    _getFilteredData() {
        const {
            filter,
            peoples } = this.props

        return peoples.filter(data => {
            const ageYears = new Date().getFullYear() - new Date(data.birth).getFullYear()

            return ['query', 'sex', 'ageFrom', 'ageTo', 'worksFor'].every(param => {
                const filterVal = filter[param]

                if (!filterVal) {
                    return true
                }

                switch(param) {
                    case 'query':
                        return data.name
                            .toLowerCase()
                            .indexOf(filterVal) > -1
                        break
                    case 'sex':
                        return data.sex === filterVal
                        break
                    case 'ageFrom':
                        return ageYears >= filterVal
                        break
                    case 'ageTo':
                        return ageYears <= filterVal
                        break
                    case 'worksFor':
                        return data.worksFor
                            .toLowerCase()
                            .indexOf(filterVal) > -1
                        break
                }
            })
        })
    }

    render() {
        const {
            query,
            sex,
            ageFrom,
            ageTo,
            worksFor } = this.props.filter
        const filteredData = this._getFilteredData()

        return <div className='Search transition-item'>
            <div className='Search__filter'>
                <TextField id='search'
                    label='search friends'
                    defaultValue={query}
                    onChange={this._onQueryChange}
                    fullWidth />
                <div className='Search__subfilter'>
                    <FilterSex active={sex} onChange={this._onFilterSexChange} />
                    <FilterAge from={ageFrom} to={ageTo} onChange={this._onFilterAgeChange} />
                    <TextField id='worksFor'
                        label='works for'
                        defaultValue={worksFor}
                        onChange={this._onFilterWorksForChange} />
                </div>
            </div>
            <SuggestPeople className='Search__results'
                action='/people'
                data={filteredData} />
        </div>
    }
}

export default Search
