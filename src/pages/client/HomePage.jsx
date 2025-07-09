import React from 'react'
import Body from '../../components/Body'
import Banner from '../../components/Banner'
import FloatingContact from '../../components/FloatingContact'
import BrandComponent from '../../components/BrandComponent/BrandComponent'

const HomePage = () => {
  return (
    <div className="">
        <Banner/>
        <Body/>
        <BrandComponent/>
        <FloatingContact/>
    </div>
  )
}

export default HomePage