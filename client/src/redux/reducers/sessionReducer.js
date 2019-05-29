import sessionConstants from '../constants/sessionConstants'

let session = sessionStorage.getItem('auth')

const initialState = session ? {isLogged: true, session} : {isLogged: false, session: null}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case sessionConstants.LOGIN:
            sessionStorage.setItem('auth', JSON.stringify(action.data))
            return { session: JSON.stringify(action.data), isLogged: true }
        case sessionConstants.LOGOUT:
            sessionStorage.removeItem('auth')
            return { session: null, isLogged: false }
        default:
            return state
    }
}

export default sessionReducer