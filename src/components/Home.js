import React from 'react'
import Banner from './Banner/Banner';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from "./Footer/Footer";
import Combine from "./rowpost/Combine";

const Home = () => {
  return (
    <div className='mains'>
      
      <Banner />
      <Combine/>
      <Footer />
      

    </div>
  )
}

export default Home