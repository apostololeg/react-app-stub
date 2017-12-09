export const getDeviceOrientation = () => {
    let isPortrait = Number.isFinite(window.orientation)
        ? window.orientation === 0
        : window.innerHeight > window.innerWidth

    return isPortrait ? 'portrait' : 'landscape'
}

const preventDefault = e => e.preventDefault()
export const freezeScroll = () => {
    document.addEventListener('touchmove', preventDefault, false)
}
export const unfreezeScroll = () => {
    document.removeEventListener('touchmove', preventDefault)
}

const bindOrientation = cb => {
    window.addEventListener('resize', cb, false)
    window.addEventListener('orientationchange', cb, false)
}
export const onOrientationChange = cb => {
    bindOrientation(() => {
        let orientation = getDeviceOrientation()

        cb(orientation)
        // http://stackoverflow.com/a/6603537
        setTimeout(() => {
            let newOrientation = getDeviceOrientation()

            if (newOrientation !== orientation) {
                orientation = newOrientation
                cb(newOrientation)
            }
        }, 200)
    })
}
