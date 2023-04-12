import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'

function ProductScreen(){
    const {id} = useParams()
    const product = products.find((product)=>product._id.toString() === id)
    return(
        <div>
            
            <Link to='/' className= 'btn btn-light my-3'>Wróć</Link>
            <Row>
                <Col md={6}>
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
                        Opis: {product.description}
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={2}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Cena: </Col>
                                    <Col>
                                    {product.price}zł
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Ilość:</Col>
                                    <Col>
                                        {product.countInStock}  
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-dodaj' disabled = {product.countInStock==0} type='button'>Dodaj do koszyka</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen