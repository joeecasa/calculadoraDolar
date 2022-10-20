import React from 'react'
import AppRoutes from '../routes/AppRoutes'
import Footer from './Footer'
import Header from './Header'
import "./components.css"


const App = () => {
  return (
    <div className='div-app'>
      <div className=''>

        <Header />
        <AppRoutes />
      </div>
      <Footer className="footer" />
    </div>
  )
}

export default App