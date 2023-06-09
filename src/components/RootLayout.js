import React from 'react'
import NavBar from './navbar/NavBar'
import Footer from './footer/Footer'
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
	<div>
    <div className='content-container'>
      <NavBar/>
      <div className='container'>
        <Outlet/>
      </div>
      <div className='footer-container'>
        <Footer/>
      </div>
    </div>
  </div>
  )
}

export default RootLayout