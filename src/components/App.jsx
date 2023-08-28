import React from 'react'
import AppRoutes from '../routes/AppRoutes'
import Footer from './Footer'
import Header from './Header'
import "./components.css"


const App = () => {
  return (
    <div className='div-app'>
      <Header />
      <div className='content'>
        <AppRoutes />
      </div>
      <Footer />
    </div >
  )
}

export default App