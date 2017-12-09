import { updateState } from './'

const testLogs = {
    1: {
        name: 'debug',
        msg: 'some debug information'
    },
    2: {
        name: 'info',
        msg: 'some info information'
    },
    4: {
        name: 'warning',
        msg: 'some warning information'
    },
    8: {
        name: 'error',
        msg: 'some error information'
    },
    16: {
        name: 'FATAL ERROR!',
        msg: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA!'
    }
}

const getRandomLog = () => {
    let msgLevels = [1,2,4,8,16]
    let randomLevelId = Math.round(Math.random() * (msgLevels.length-1))
    let level = msgLevels[randomLevelId]

    return {
        header: { seq: Math.random() },
        level,
        ...testLogs[level]
    }
}

// mock connection for testing state machine
export default dispatch => {
    const update = (data, cb, delay = 1000) => setTimeout(() => {
        cb && cb()
        dispatch(updateState(data))
    }, delay)

    return  {
        landed: true,
        connection: {
            socket: {
                bufferedAmount: 0
            }
        },
        on(event) {
            switch(event) {
                case 'connected':
                    update({
                        connected: true,
                        landed: true
                    }, () => this.landed = true)
                    break
            }
        },
        createTopic({ name }) {
            return {
                listeners: {},
                subscribe(cb) {
                    // simulate messages flow
                    switch(name) {
                        case '/rosout_agg':
                            this.listeners[name] = setInterval(
                                () => {
                                    cb(getRandomLog())
                                    // fast updated queue test
                                    if (Math.random() * 3 < 1) {
                                        setTimeout(() => cb(getRandomLog()), 500)
                                    }
                                },
                                2000
                            )
                    }

                    return {
                        dispose() {
                            switch(name) {
                                case '/rosout_agg':
                                    clearInterval(this.listeners[name])
                            }
                        }
                    }
                },
                publish(payload) {
                }
            }
        },
        callService({ name }, data) {
            switch(name) {
                case '/mavros/set_mode':
                    return new Promise(resolve => {
                        update(
                            { mode: data.custom_mode },
                            () => resolve({ mode_sent: true })
                        )

                        if (data.custom_mode === 'OFFBOARD' && this.landed) {
                            // emulate takeoff and land after 5 sec.
                            update({ landed: false }, () => {
                                this.landed = false
                                update({ landed: true }, () => this.landed = true, 5000)
                            })
                        }
                    })
                case '/mavros/cmd/arming':
                    return new Promise(resolve => {
                        update(
                            { armed: data.value },
                            () => resolve({ success: true })
                        )

                        if (!data.value) {
                            update({ mode: 'STABILIZED' })
                        }
                    })
            }
        }
    }
}
