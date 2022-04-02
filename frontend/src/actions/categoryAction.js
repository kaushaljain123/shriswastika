import axios from 'axios'
import { GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, GET_ALL_CATEGORY_FAIL } from '../constants/categoryConstant'


export const getAllCategory = () => async(dispatch) => {
    try {
        dispatch({
            type: GET_ALL_CATEGORY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get('/api/category', config)

        dispatch({
            type: GET_ALL_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }   
}