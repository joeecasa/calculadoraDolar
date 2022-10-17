import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import Calculadora from '../pages/Calculadora'
import HomePage from '../pages/HomePage'




const AppRoutes = () => {
  return (
    <div>
      <Routes>

      <Route path="/" element={<HomePage  />} />
      <Route path="/calculadora" element={<Calculadora  />} />
      {/* <Route path="/tiposdedolar" element={<TiposDeDolar  />} /> */}

      <Route path="*" element={<Navigate to="/" />} />


      </Routes>
    </div>
  )
}

export default AppRoutes