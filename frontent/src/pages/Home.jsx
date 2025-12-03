import '../pageStyles/Home.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'
import { useSelector } from 'react-redux'
const products= [
           {
            "_id": "69038f2e757a405f9bc137f6",
            "name": "product4",
            "description": "product description4",
            "price": 450,
            "ratings": 1,
            "image": [],
            "category": "mobile",
            "stock": 2,
            "numberOfReview": 0,
            "reviews": [
                {
                    "user": "69182691eeff42f72102c1d3",
                    "name": "amaya",
                    "rating": 2,
                    "comment": "not super",
                    "_id": "6918356e590ef2e4159eda42"
                }
            ],
            "createdAt": "2025-10-19T15:09:14.119Z",
            "__v": 2,
            "numOfReviews": 3
        },
        {
            "numOfReviews": 0,
            "_id": "69038f2e757a405f9bc137f7",
            "name": "product5",
            "description": "product description5",
            "price": 500,
            "ratings": 0,
            "image": [],
            "category": "watch",
            "stock": 1,
            "numberOfReview": 0,
            "reviews": [],
            "createdAt": "2025-10-19T15:09:14.119Z",
            "__v": 0
        }
      ]

function Home() {
    useSelector
  return (
    <>
    <PageTitle title="Home-My Website"/>
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