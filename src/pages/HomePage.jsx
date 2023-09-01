import React from 'react'
import Cotizaciones from './Cotizaciones';
import Calculadora from './Calculadora';

import "./pages.css"

function HomePage() {
  return (
    <div className='div-home'>
      <Calculadora />
      <Cotizaciones />

    </div>
  );
}

export default HomePage;