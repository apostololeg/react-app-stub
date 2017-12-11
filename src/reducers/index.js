const initialState = {
    locations: [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/about',
            name: 'About'
        }
    ],
    filter: {
        query: '',
        sex: null,
        ageFrom: null,
        ageTo: null,
        worksFor: null
    },
    peoples: []
}

export const locations = (state = initialState.locations, { type, data }) => {
    return state
}

export const peoples = (state = initialState.peoples, { type, data }) => {
    if (type === 'SET_PEOPLES') {
        return data
    }

    return state
}

export const filter = (state = initialState.filter, { type, data }) => {
    if (type === 'SET_FILTER') {
        return {
            ...state,
            ...data
        }
    }

    return state
}
