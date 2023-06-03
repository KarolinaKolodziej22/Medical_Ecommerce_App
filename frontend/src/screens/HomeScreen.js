import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import LoadingComponent from '../components/LoadingComponent';

import products from '../products'
import axios from 'axios'
import {listProducts} from '../actions/productAction'



function HomeScreen() {
    /* const [products, setProduct] = useState([]) //state 
    useEffect(() => { 

        async function fetchProducts(){
            const {data} = await axios.get('http://127.0.0.1:8000/api/products/')
            setProduct(data)
        }

        fetchProducts()
    }, []) */
    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {error, loading, products}=productList
    useEffect(() => {
        dispatch(listProducts())
        
    }, [dispatch])



    return(
        <div>
            <h1>Produkty</h1>
            {loading ? <LoadingComponent/>
            : error ? <h3>{error}</h3>
            : 
            <Row>
            {products.map(product => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                 <Product product={product} />
             </Col>
            ))}
            </Row>
            }
        </div>
    )
}
    
export default HomeScreen;
