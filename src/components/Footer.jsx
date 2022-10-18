import React from 'react'
import { Link } from 'react-router-dom'
import "./components.css"
const Footer = () => {

  return (
    <div>
      <Link to="#" className='link-foot'>
        Desarrollado por Joel casa

      </Link>

      <a
      className='link-foot'
        href={"https://www.dolarsi.com/"}
      >
        Fuente
        (DolarSI)
      </a>
    </div>
  )
}

export default Footer