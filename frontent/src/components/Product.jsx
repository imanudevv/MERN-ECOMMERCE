import '../componentStyles/Product.css';

function Product({ product }) {
    console.log(product);

    return (
        <div className="product-card">
            <img 
                src={product?.image?.[0]?.url} 
                alt={product?.name} 
            />
            <div className="product-details">
                <h3 className="product-title">Product1</h3>
                <p className="product-price">
                    <strong>Price</strong>500/-
                </p>
                <button className="add-to-cart">Add To Cart</button>
            </div>
        </div>
    );
}

export default Product;
