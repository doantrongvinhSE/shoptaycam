import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Body from '../../components/Body'
import TopBar from '../../components/TopBar'
import Banner from '../../components/Banner'

const HomePage = () => {
  return (
    <div className="">
        <TopBar/>
        <Header className=""/>
        <Banner/>
        <Body/>
        <Footer/>
    </div>
  )
}

export default HomePage