import React, {useEffect} from 'react'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartAction'
import { List } from '@mui/material'

function Cart() {
    const { id } = useParams();
    console.log('ID', id)
    const location = useLocation();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log('qty', qty) //sprawdzenie czy wyswietla konkretna liczbe 

    const dispatch=useDispatch();
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log('cartIt:', cartItems)

    const navigate=useNavigate()

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id, qty)) //wywolaj dodanie do koszyka jesli id istnieje 
        }
    },[dispatch, id, qty])
    
    //usuwanie produktow
    const removeFromCartHandler = () => {
        console.log('remove: ', id) //sprawdzanko
        dispatch(removeFromCart(id)) //usun dane dla danego id
    }

    //przejscie do koszyka
    const checkout = () => {
        navigate(`/login?redirect=shipping`) 
    }
    return(
        <Row>
    <Col md={8}>
        <h1>Twój koszyk</h1>
        {cartItems.length === 0 ? ( //jesli nie ma produktow, zwroc napis koszyk pusty z opcja wroc
            <div>
                <h2>jest pusty</h2> 
                <Link to="/">Wróć</Link>
            </div>
        ) : (
            <ListGroup variant="flush">
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}> 
                        <Row>
                            <Col md={1}>
                                {<Image src={item.image} style={{ maxWidth: '100%', height: 'auto' }}/>}
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                {item.price}zł
                            </Col>
                            <Col md={2}>
                                sztuk: {item.qty} 
                            </Col>
                            <Col md={2}>
                                <Button
                                type = 'button'
                                variant = 'light'
                                onClick={() => removeFromCartHandler(item.product)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </Col>


            <Col md={3}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h2>Suma:</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h5>{cartItems.reduce((sum,item)=>sum + item.qty,0)} produktów</h5> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>{cartItems.reduce((sum,item)=>sum + item.qty*item.price,0).toFixed(2)} zł</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                            type = 'button'
                            className = 'btn-block'
                            disabled={cartItems.length===0}
                            onClick={checkout}
                            >
                            Przejdź do kasy
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart