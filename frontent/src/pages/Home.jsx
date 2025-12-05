import '../pageStyles/Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProduct } from '../features/products/prouctSlice';
import  Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';



function Home() {
 const {loading,error,products,productCount}= useSelector((state)=>(state.product));
const dispatch=useDispatch();
useEffect(()=>{
  dispatch(getProduct())
},[dispatch])

useEffect(()=>{
  if(error){
    toast.error(error.message);

  }
})
  return (
    <>
   { loading?(<Loader/>) :(<>
      <PageTitle title="Home-My Website" />
      <Navbar />
      <ImageSlider />

      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>

        <div className="home-product-container">
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </>)}
    </>
  );
}

export default Home;
