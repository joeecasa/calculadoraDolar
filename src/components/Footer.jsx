import React from 'react'
import "./components.css"
const Footer = () => {

  return (
    <div>
      <a 
      href="https://www.linkedin.com/in/joel-casa-marquez/" 
      className='link-foot' 
      target="_blank" 
      rel="noopener noreferrer">
       © Joel Casa Marquez 2023

      </a>

      <a
      className='link-foot'
        href={"https://www.dolarsi.com/"}
        target="_blank" 
        rel="noopener noreferrer"
      >
        Fuente
        (DolarSI)
      </a>
    </div>
  )
}

export default Footer