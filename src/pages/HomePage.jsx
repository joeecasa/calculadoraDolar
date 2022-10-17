import React, { useEffect, useState } from 'react'
import TarjetaDolar from '../components/TarjetaDolar';
import { useCustomFetchDolar } from '../hooks/useCustomFetchDolar';
import dolar from "../components/assets/logo/dolar.svg"
import dolarBlue from "../components/assets/logo/dolarBlue.svg"
import dolarBolsa from "../components/assets/logo/dolarBolsa.svg"
import dolarQatar from "../components/assets/logo/dolarQatar.svg"
import dolarAhorro from "../components/assets/logo/dolarAhorro.svg"
import dolarLiqui from "../components/assets/logo/dolarLiqui.svg"
import dolarTurista from "../components/assets/logo/dolarTurista.svg"

function HomePage() {

  const jsonDolar = useCustomFetchDolar("https://www.dolarsi.com/api/api.php?type=valoresprincipales")

  const { dataDolar } = !!jsonDolar && jsonDolar;

  const [tipoDolar, setTipoDolar] = useState()
  const [dolarOficial, setDolarOficial] = useState()
  const [oficial, setOficial] = useState()

  useEffect(() => {
    if (dataDolar) {
      setTipoDolar(dataDolar.filter((tipos) => {
        return tipos.casa.nombre !== "Argentina" &&
          tipos.casa.nombre !== "Dolar" &&
          tipos.casa.nombre !== "Bitcoin" &&
          tipos.casa.nombre !== "Dolar Soja" &&
          tipos.casa.nombre !== "Dolar turista"

      }))


    }

    if (dataDolar) {
      setDolarOficial(dataDolar.filter((dolar) => {
        return dolar.casa.nombre === "Dolar Oficial"
      }))
    }

    if (dolarOficial && dolarOficial.length !== 0) {

      setOficial(parseFloat(dolarOficial[0].casa.venta.replace(/,/g, '.')).toFixed(2))
  }




  }, [dataDolar])


console.log(dolarOficial)
console.log(oficial)




  return (
    <div className='div-home'>



      <h2 className='home-title'>
        Tipos de Dolar
        <a
          href={"https://www.dolarsi.com/"}
        >

          (DolarSI)
        </a>
      </h2>

      <div className='d-flex flex-wrap container-main'>
        {
          tipoDolar ?
            (

              tipoDolar.map((dolares) => {
                return (

                  <TarjetaDolar
                    key={dolares.casa.nombre}
                    nombre={dolares.casa.nombre}
                    compra={dolares.casa.compra}
                    venta={dolares.casa.venta}
                    logo={dolares.casa.nombre === "Dolar Oficial" ? `${dolar}` :
                      dolares.casa.nombre === "Dolar turista" ? `${dolarTurista}` :
                        dolares.casa.nombre === "Dolar Bolsa" ? `${dolarBolsa}` :
                          dolares.casa.nombre === "Dolar Contado con Liqui" ? `${dolarLiqui}` :
                            dolares.casa.nombre === "Dolar Blue" ? `${dolarBlue}` : "nada"

                    }
                  />


                )

              })
            )
            :
            (
              <div className="spinner-border text-success" >
                <span className="visually-hidden">Loading...</span>
              </div>
            )
        }
        <TarjetaDolar
          nombre={"Dolar Qatar"}
          compra={"No Cotiza"}
          venta={oficial*2}
          logo={dolarQatar}
        />
        <TarjetaDolar
          nombre={"Dolar Ahorro"}
          compra={"No Cotiza"}
          venta={oficial*1.65}
          logo={dolarAhorro}
        />
        <TarjetaDolar
          nombre={"Dolar Turista/Tarjeta"}
          compra={"No Cotiza"}
          venta={oficial*1.80}
          logo={dolarTurista}
        />

      </div>




    </div>
  );
}

export default HomePage;