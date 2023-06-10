import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`http://localhost:3000/api/products/${id}`) //pobierz z bazy

    dispatch({
        type: CART_ADD_ITEM,
        payload:{ //do zaladowania
            product: data._id,
            name: data.name,
            image: data.image, 
            price: data.price, 
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //zmien na string, dodaj do cartItems
}

export const removeFromCart = (id) => (dispatch, getState) => { //usun z koszyka
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id, // ladujemy id

    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //ustaw, przekonwertuj na json, dodaj
}
