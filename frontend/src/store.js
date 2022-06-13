import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers, productDeleteReducers, productCreateReducer, productUpdateReducer, bannerUpdateReducers, bannerListReducers, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { categorysReducers } from './reducers/categoryReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers, userListReducers, userDeleteReducers, userUpdateReducers } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'


const cartItemfromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfofromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressfromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailsReducers,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    bannerUpdate: bannerUpdateReducers,
    bannerList: bannerListReducers,
    orderLists: orderListReducer,
    getCategorys: categorysReducers
})

const initialState = {
    cart: { cartItems: cartItemfromStorage, shippingAddress: shippingAddressfromStorage }, userLogin: { userInfo: userInfofromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store