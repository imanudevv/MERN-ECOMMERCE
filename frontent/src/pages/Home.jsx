import '../pageStyles/Home.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
const products= [
        {
            "numOfReviews": 0,
            "_id": "69038f2e757a405f9bc137f4",
            "name": "product2",
            "description": "product description2",
            "price": 350,
            "ratings": 0,
            "image": [],
            "category": "bed",
            "stock": 4,
            "numberOfReview": 0,
            "reviews": [],
            "createdAt": "2025-10-19T15:09:14.119Z",
            "__v": 0
        },
        {
            "_id": "69038f2e757a405f9bc137f5",
            "name": "product3",
            "description": "product description3",
            "price": 400,
            "ratings": 0,
            "image": [],
            "category": "tv",
            "stock": 8,
            "numberOfReview": 0,
            "reviews": [],
            "createdAt": "2025-10-19T15:09:14.119Z",
            "__v": 0,
            "numOfReviews": 0
        }]

function Home() {
  return (
    <>
    <Navbar/>
    <ImageSlider/>
    <div className="home-container">
      <h2 className='home-heading'>Trending Now</h2>
      <div className="home-product-container">
     {products.map((product, index) => (
  <Product product={product} key={index} />
))}

      </div>
      </div>
<Footer/>
</>
  
  )
}

export default Home