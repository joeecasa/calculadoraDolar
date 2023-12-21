import React from 'react'
import "./components.css"



const TarjetaDolar = ({ nombre, venta, compra, logo }) => {


// console.log(parseFloat(venta).toFixed(2))
// console.log(venta + compra)
    return (
        <div className="card div-card">
            <div className="card-body">
                <div className='card-title-container'>
                    <h5 className="card-title">{nombre}</h5>
                    <img src={logo} alt="logo" className='card-logo' />
                </div>
                <div className='card-text-container'>
                    <p className="card-text">Compra {compra} 
                        </p>
                    <p className="card-text">Venta {(venta)}</p>
                </div>
            </div>
        </div >
    )
}

export default TarjetaDolar