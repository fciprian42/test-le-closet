import sessionConstants from '../constants/sessionConstants'

let session = sessionStorage.getItem('auth')

const initialState = session ? {isLogged: true, session} : {isLogged: false, session: null}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case sessionConstants.LOGIN:
            return {}
        case sessionConstants.LOGOUT:
            return {}
        default:
            return state
    }
}

export default sessionReducer