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
    test: null
}

export const locations = (state = initialState.locations, { type, data }) => {
    return state
}

export const test = (state = initialState.test, { type, data }) => {
    if (type === 'TEST_ACTION') {
        return data
    }

    return state
}
