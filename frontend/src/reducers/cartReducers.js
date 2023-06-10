import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'
//reducer dla koszyka, dany stan i akcja, ktora zmieni obecny stan aplikacji 
export const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type){
        case CART_ADD_ITEM: //dodawanie do koszyka
            const item = action.payload 
            const existItem = state.cartItems.find(x => x.product === item.product) //znajdz produkt w cartItems
            if(existItem){ //jesli istnieje
                return{
                    ...state, //zwroc stan, zastap dany produkt, nowym 
                    cartItems: state.cartItems.map(x=>
                        x.product===existItem.product ? item : x)
                }
            }else{
                return{ //w przeciwnym wypadku, gdy nie istnieje, do cartItems dodaj nowy produkt do koszyka
                    ...state, 
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM: //usuwanie
            return{
                ...state, //spread operator - rozprzestrzenianie stanu koszyka, kopia istniejacych elementow
                cartItems:state.cartItems.filter(x=>x.product != action.payload) //filtrowanie tablicy, usuniecie o danym id produktu, zwrocenie nowej bez tego produktu 
            } //tutaj action.payload to id, ogolnie zawiera informacje o danych przekazywanych po wywolaniu akcji
        default:
            return state //zwroc niezmieniony stan
    }
}