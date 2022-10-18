import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./assets/logo/logo.svg"


const Header = () => {
    return (
        <nav className="navbar navbar-expand" style={{"backgroundColor": "white"}}>
            <div className="container-fluid main-nav-container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li>
                            <img src={logo} className="App-logo" alt="logo" />

                        </li>
                        <li className='nav-item'>

                            <Link
                                className='nav-link'
                                to={"/"}
                            >
                                Home
                            </Link>
                        </li>



                        <li className='nav-item'>
                            <Link className='nav-link' to={"/calculadora"} >
                                Calculadora Dolar Tarjeta
                                
                            </Link>
                        </li>


                    </ul>
                </div>
            </div >
        </nav >
    )
}

export default Header