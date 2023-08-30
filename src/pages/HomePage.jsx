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
  // const [qatar, setQatar] = useState(1);
  // const [ahorro, setAhorro] = useState(1);
  // const [tarjeta, setTarjeta] = useState(1);



  useEffect(() => {

    if (dataDolar) {
      setTipoDolar(dataDolar.filter((tipos) => {
        return tipos.casa.nombre !== "Argentina" &&
          tipos.casa.nombre !== "Dolar" &&
          tipos.casa.nombre !== "Bitcoin" &&
          tipos.casa.nombre !== "Dolar Soja" &&
          tipos.casa.nombre !== "Dolar turista"
      }))
      // setDolarOficial(dataDolar.filter((dolar) => {
      //   return dolar.casa.nombre === "Dolar Oficial"
      // }))
    }

    if (dataDolar) {
      setDolarOficial(dataDolar.filter((dolar) => {
        return dolar.casa.nombre === "Dolar Oficial"
      }))
    }
    console.log(dataDolar,"datadolar")


  }, [dataDolar])

useEffect(() => {

    if (dolarOficial && dataDolar) {

      setOficial(parseFloat(dolarOficial[0].casa.venta.replace(/,/g, '.')).toFixed(2))

    }
}, [dataDolar,dolarOficial])



  // console.log(dolarOficial)
  // console.log(oficial)
  // console.log(qatar)



  return (
    <div className='div-home'>



      <h2 className='home-title'>
        Tipos de Dolar
        
      </h2>

      <div className='d-flex flex-wrap container-main'>
        {
          tipoDolar ?
            (

              tipoDolar.map((dolares) => {
                return (

                  <TarjetaDolar
                    key={dolares.casa.nombre}
                    nombre={dolares.casa.nombre=== "Dolar Bolsa" ? "Dolar Mep/Bolsa" :
                      dolares.casa.nombre}
                    compra={dolares.casa.compra}
                    venta={(dolares.casa.venta)}
                    logo={dolares.casa.nombre === "Dolar Oficial" ? `${dolar}` :
                      dolares.casa.nombre === "Dolar turista" ? `${dolarTurista}` :
                        dolares.casa.nombre === "Dolar Bolsa" ? `${dolarBolsa}` :
                          dolares.casa.nombre === "Dolar Contado con Liqui" ? `${dolarLiqui}` :
                            dolares.casa.nombre === "Dolar Blue" ? `${dolarBlue}` :  
                            dolares.casa.nombre === "Bitcoin" ? `${dolarBlue}` : "nada" 
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
          venta={(oficial*2).toFixed(2)}
          logo={dolarQatar}
        />
        <TarjetaDolar
          nombre={"Dolar Ahorro"}
          compra={"No Cotiza"}
          venta={(oficial*1.65).toFixed(2)}
          logo={dolarAhorro}
        />
        <TarjetaDolar
          nombre={"Dolar Turista/Tarjeta"}
          compra={"No Cotiza"}
          venta={(oficial*1.75).toFixed(2)}
          logo={dolarTurista}
        />

      </div>




    </div>
  );
}

export default HomePage;