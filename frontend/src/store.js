import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'

const cartItemfromStorage = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []
const reducer = combineReducers({ productList: productListReducers, productDetail:productDetailsReducers, cart:cartReducers })

const initialState = {
    cart: { cartItems: cartItemfromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools (applyMiddleware(...middleware)))

export default store