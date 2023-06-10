import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'
import RatingStars from 'react-rating-stars-component'
import axios from 'axios'

import { useDispatch, useSelector} from 'react-redux'
import {listDetailsOfProducts} from '../actions/productAction'
import LoadingComponent from '../components/LoadingComponent'



function ProductScreen(){ //przekazanie parametru ktory nie dziala:)))
    const [qty, setQty] = useState(1)

    const {id} = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(listDetailsOfProducts(id))
        console.log(id)

    },[dispatch,id])


    //handler zdarzenia 
    const addToCart = () => {
       // console.log('add to cart', id) //sprawdzenie czy dziala
       navigate(`/koszyk/${id}?qty=${qty}`) //
    }
     const product = products.find((product)=>product._id.toString() === id)
    return(
        <div>
            
            <Link to='/' className= 'btn btn-light my-3'>Wróć</Link>
            <Row>
                <Col md={5}>
                 <Image src ={productDetails.product.image} alt={productDetails.product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3 style = {{marginLeft: '80px}}'}}>{productDetails.product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={productDetails.product.rating} color={'#ffd700'}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Cena: {productDetails.product.price}zł
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {productDetails.product.description}
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3} style = {{marginTop: '50px'}}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row  style = {{marginTop: '20px'}}>
                                    <Col>Cena: </Col>
                                    <Col>
                                    {productDetails.product.price}zł
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           {/*  <ListGroup.Item>
                                <Row style = {{marginTop: '20px'}}>
                                    <Col>Ilość:</Col>
                                    <Col>
                                        {product.countInStock}  
                                    </Col>
                                </Row>
                            </ListGroup.Item> */}

                            {product.countInStock > 0 ? ( //jesli wieksze od 0
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Ilość</Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control
                                        as='select'
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)} //update jak zmieniamy wartosci
                                        >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))}
                                        </Form.Control>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                             ): (
                                <ListGroup.Item>Brak w magazynie</ListGroup.Item>
                             )}

                            <ListGroup.Item>
                                <Button 
                                className='btn-dodaj' 
                                onClick = {addToCart}
                                disabled = {product.countInStock===0} 
                                type='button'>Dodaj do koszyka</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                 
                </Col>
            </Row>
            <Row>
                <Col md={4} style={{fontSize: '32px'}}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                        Dodaj ocenę produktu:
                        </ListGroupItem>

                        <ListGroupItem>
                    <RatingStars
                        count={5}
                        value={productDetails.product.rating}
                        size={24}
                        activeColor="#ffd700"
                        /> 
                        </ListGroupItem>
                    
                        </ListGroup>
                        
                </Col>
                <Col md={4} style = {{fontSize: '32px'}}>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        Dodaj recenzję:
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <em style={{fontSize: '24px'}}>Opis...</em>
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4} style = {{fontSize: '32px', marginTop: '50px'}}>
                    <Row>
                    <Button className='btn-ocena' type='button'>Zatwierdź</Button>
                    </Row>
               
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen