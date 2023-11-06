import React from 'react'
import AppRoutes from '../routes/AppRoutes'
import Footer from './Footer'
import Header from './Header'
import "./components.css"


const App = () => {
  return (


    <div className='div-app'>
      {/* <div className='maintenance-container'>
    <div className="content">
    <h1  className='maintenance-h1' >Actualización de la Aplicación</h1>
    <p  className='maintenance-p' >Estamos realizando actualizaciones y mantenimiento en la aplicación.</p>
    <p className='maintenance-p' >Disculpa las molestias ocasionadas.</p>
    <p className='maintenance-p' >Gracias por tu paciencia.</p>
    </div>
  </div> */}
      <Header />
      <div className='content'>
        <AppRoutes />
      </div>
      <Footer />
    </div >
  )
}

export default App