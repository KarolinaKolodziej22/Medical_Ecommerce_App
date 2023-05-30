import React from 'react'
import {Card} from 'react-bootstrap'
// import RatingStars from 'react-rating-stars-component';
import Rating from './Rating';
import {Link} from 'react-router-dom'

function Product( {product} ){
    return(
        <Card className="my-3 p-3 rounded">
        <Link to = {`/product/${product._id}`}>
            <Card.Img src = {product.image}></Card.Img>
        </Link>
        <Card.Body as="h4">
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    {product.name}
                </Card.Title>
            </Link>


        <Card.Text as ="div">
            <div className="my-3">
            {product.reviewsNum} ocen
             <Rating value={product.rating} color="#ffd700"/>
           {/*   <RatingStars
              count={5}
              value={product.rating}
              size={24}
              activeColor="#ffd700"
            /> */}
            </div>
        </Card.Text>
        <Card.Text as="h4">
          {product.price} zł
        </Card.Text>
        </Card.Body>
        </Card>



        
    )
}
export default Product;