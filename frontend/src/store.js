import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers, userListReducers, userDeleteReducers, userUpdateReducers } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducers'

const cartItemfromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfofromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressfromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const reducer = combineReducers({ 
    productList: productListReducers, 
    productDetail:productDetailsReducers, 
    cart:cartReducers, 
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers, 
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers
    })

const initialState = {
    cart: { cartItems: cartItemfromStorage, shippingAddress: shippingAddressfromStorage }, userLogin: { userInfo: userInfofromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools (applyMiddleware(...middleware)))

export default store