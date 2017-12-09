import './uniqueID.js'

const wait = {}

function throttle(cb, limit) {
    const id = cb.uniqId

    if (!wait[id]) {
        cb()
        wait[id] = true
        setTimeout(() => {
            wait[id] = false
            cb()
        }, limit)
    }
}

export default throttle
