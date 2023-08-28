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
        <Footer className="footer" />
      </div>
    </div>
  )
}

export default App