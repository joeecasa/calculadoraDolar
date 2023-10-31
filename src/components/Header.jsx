import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./assets/logo/logo.svg"


const Header = () => {
    return (
        <nav className="navbar navbar-expand" style={{ "backgroundColor": "white" }}>
            <div className="container-fluid main-nav-container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li>

                            <div
                                className='nav-item'
                            >
                                <img src={logo} className="App-logo" alt="logo" />

                            </div>
                        </li>
                        <li className='nav-item'>
                            <div className='nav-link' >
                                Calculadora Dolar

                            </div>
                        </li>


                    </ul>
                </div>
            </div >
        </nav >
    )
}

export default Header