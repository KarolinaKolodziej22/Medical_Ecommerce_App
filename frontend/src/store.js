import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import moduleName from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

//
const cartItemsFromStorage = localStorage.getItem('cartItems') ?  // kiedy nie istnieje to pusta tablica
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? //kiedy nie ma to null
 JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState = {
    cart: {cartItems: cartItemsFromStorage}, 
    userLogin: {userInfo: userInfoFromStorage}
} 

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store