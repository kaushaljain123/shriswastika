import { GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, GET_ALL_CATEGORY_FAIL } from '../constants/categoryConstant'

// USER LOGIN REDUCERS
export const categorysReducers = (state = { categorys: [] }, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY_REQUEST:
            return { loading: true, categorys: [] }
        case GET_ALL_CATEGORY_SUCCESS:
            return { loading: false, categorys: action.payload }  
        case GET_ALL_CATEGORY_FAIL:
            return { loading: false, error: action.payload }       
        default:
            return state     
    }
}