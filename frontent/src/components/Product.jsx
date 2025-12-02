import '../componentStyles/Product.css';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useState } from 'react';

function Product({ product }) {
    const [rating,setRating]=useState(0);
    const handleRatingChange=(newRating)=>{
        setRating(rating)
        console.log(`Rating changed to: ${newRating}`);
        
    }
  
    return (
        <Link to={product._id}className='product_id'>
        <div className="product-card">
            <img 
                src={product?.image?.[0]?.url} 
                alt={product?.name} 
            />
            <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">
                    <strong>Price</strong> {product.price}
                </p>
                <div className="ratinf_container">
                    <Rating
                    value={product.rating}
                    onRatingChange={handleRatingChange}
                    disabled={true}
                    />
                </div>
                <button className="add-to-cart">Add To Cart</button>
            </div>
        </div>
        </Link>
    );
}

export default Product;
