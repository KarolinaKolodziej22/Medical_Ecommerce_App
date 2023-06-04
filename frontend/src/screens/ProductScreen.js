import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'
import RatingStars from 'react-rating-stars-component'
import axios from 'axios'

import { useDispatch, useSelector} from 'react-redux'
import {listDetailsOfProducts} from '../actions/productAction'
import LoadingComponent from '../components/LoadingComponent'



function ProductScreen({}){
    const {id} = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(listDetailsOfProducts(id))

    },[dispatch])

   /*  const [product, setProduct] = useState([]) //pusta tab, na poczatku 
    useEffect(() => {

        async function fetchProduct(){
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
              } catch (error) {
                // Obsługa błędu żądania
                console.error(error);
              }
        }

        fetchProduct() // pobierz produkt z serwera
    }, [])
 */
     const product = products.find((product)=>product._id.toString() === id)
    return(
        <div>
            
            <Link to='/' className= 'btn btn-light my-3'>Wróć</Link>
            <Row>
                <Col md={5}>
                 <Image src ={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3 style = {{marginLeft: '80px}}'}}>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.reviewsNum} ocen`} color={'#ffd700'}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Cena: {product.price}zł
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {product.description}
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
                                    {product.price}zł
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row style = {{marginTop: '20px'}}>
                                    <Col>Ilość:</Col>
                                    <Col>
                                        {product.countInStock}  
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-dodaj' disabled = {product.countInStock===0} type='button'>Dodaj do koszyka</Button>
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
                        value={product.rating}
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