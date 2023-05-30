import React, { useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'
import axios from 'axios'

function HomeScreen() {
    /* const [products, setProduct] = useState([]) //state 
    useEffect(() => { 

        async function fetchProducts(){
            const {data} = await axios.get('http://127.0.0.1:8000/api/products/')
            setProduct(data)
        }

        fetchProducts()
    }, []) */

    return(
        <div>
            <h1>Produkty</h1>
            <Row>
                {products.map(product => (
                   <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                     <Product product={product} />
                 </Col>
                ))}
            </Row>
        </div>
    )
}
    
export default HomeScreen;
