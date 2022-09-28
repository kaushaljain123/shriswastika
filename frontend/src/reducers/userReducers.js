import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_UPDATE_PROFILE_RESET, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL } from '../constants/userConstants'

// USER LOGIN REDUCERS
export const userLoginReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userRegisterReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userDetailsReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userUpdateProfileReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userListReducers = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const userUpdateReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return state
    }
}

// SEND EMAIL CODE FOR  FORGOT PASSWORD REDUCERS
export const sendEmailReducers = (state = {}, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return { emailLoading: true }
        case SEND_EMAIL_SUCCESS:
            return { emailLoading: false, emailInfo: action.payload }
        case SEND_EMAIL_FAIL:
            return { emailLoading: false, emailError: action.payload }
        default:
            return state
    }
}

// UPDATE PASSSWORD REDUCERS
export const updatePasswordReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return { passwordLoading: true }
        case UPDATE_PASSWORD_SUCCESS:
            return { passwordLoading: false, passwordInfo: action.payload }
        case UPDATE_PASSWORD_FAIL:
            return { passwordLoading: false, passwordError: action.payload }
        default:
            return state
    }
}

// USER REGISTER REDUCERS
export const orderPendingDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return { loading: true }
        case DELETE_ORDER_SUCCESS:
            return { orderLoading: false, orderInfo: action.payload }
        case DELETE_ORDER_FAIL:
            return { orderLoading: false, orderError: action.payload }
        default:
            return state
    }
}