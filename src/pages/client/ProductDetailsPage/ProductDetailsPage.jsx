import React from 'react'
import TopBar from '../../../components/TopBar'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import ProductDetailsComponent from '../../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  return (
    <div>
        <TopBar/>
        <Header className=""/>
        <ProductDetailsComponent/>
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage