import React from 'react'
import "./components.css"
const Footer = () => {

  return (
    <div className='footer'>
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
      <div
        className='link-foot2'

        target="_blank"
        rel="cafecito"
      >
        Si te gusto/sirvio la web, no dudes en dar una ayudita :)&nbsp;
        <a className='cafecito'
        href='https://cafecito.app/joeecasa'
        target='_blank'
        rel="noopener noreferrer"
        >https://cafecito.app/joeecasa</a>
      </div>

    </div>
  )
}

export default Footer