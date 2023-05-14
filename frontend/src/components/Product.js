import React from 'react'
import {Card} from 'react-bootstrap'
// import RatingStars from 'react-rating-stars-component';
import Rating from './Rating';

function Product( {product} ){
    return(
        <Card className="my-3 p-3 rounded">
        <a href = {`/product/${product._id}`}>
            <Card.Img src = {product.image}></Card.Img>
        </a>
        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    {product.name}
                </Card.Title>
            </a>

        <Card.Text as ="div">
            <div className="my-3">
             Ocena {product.rating} z {product.reviewsNum} ocen
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