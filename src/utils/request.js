import vow from 'vow'
import Cookie from 'js-cookie'
import 'whatwg-fetch' // polyfill for `fetch()`

const defaultRequestOpts = {
    credentials: 'include' // NOTE: don't need for localhost
}

export const request = (input, init = defaultRequestOpts) => {
    const needAuth = ['POST', 'PUT', 'DELETE'].indexOf(init.method) >= 0

    if (needAuth) {
        init.headers = {
            ...init.headers,
            'X-CSRF-Token': Cookie.get('csrftoken'),
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        init.credentials = 'same-origin'
    }

    return new vow.Promise((resolve, reject) => {
        fetch(input, init)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => {
                console.log('REQUEST ERROR CATCHED', input, init, err)
                reject(err)
            })
    })
        .fail(err => console.log('REQUEST PROIMSE FAILED', err))
}
