import React, { useEffect, useState } from 'react'
import "./components.css"



const TarjetaDolar = ({nombre,venta,compra,logo}) => {



    return (
        <div className="card div-card">
                <div className="card-body">
                    <h5 className="card-title">{nombre}
                    <img src={logo} alt="logo" className='card-logo' />
                    </h5>
                    <p className="card-text">Compra {compra}</p>
                    <p className="card-text">Venta {venta}</p>
                </div>
        </div>
    )
}

export default TarjetaDolar