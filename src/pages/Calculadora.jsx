import { ErrorMessage, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useCustomFetchDolar } from '../hooks/useCustomFetchDolar';
import * as Yup from "yup";
import "./pages.css"


const Calculadora = () => {
    const jsonDolar = useCustomFetchDolar("https://www.dolarsi.com/api/api.php?type=valoresprincipales")

    const { dataDolar } = !!jsonDolar && jsonDolar;

    const [dolarOficial, setDolarOficial] = useState()
    const [oficial, setOficial] = useState()
    const [impuestoPais, setImpuestoPais] = useState()
    const [impuestoGanancias, setImpuestoGanancias] = useState()
    const [total, setTotal] = useState()
    const [resultado, setResultado] = useState()
    const [totalOficial, setTotalOficial] = useState()

    const errorDiv= useRef()


    const onSubmit = () => {

        if (values.cantidad < 300) {
            setResultado((total * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.35).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))


        } else {
            setResultado((total * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.65).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.35).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))

        }


        
    }

    
    const schema = Yup.object().shape({
        cantidad: Yup.number()
            .required('Es necesario insertar una cantidad')
            .positive("Debe introducir un numero mayor a 0")

        });
        
        const { values, errors, handleChange, handleSubmit, } = useFormik({
        initialValues: {
            cantidad: ""
        },
        enableReinitialize: true,
        onSubmit,
        validationSchema: schema,
        validateOnBlur : false,
        validateOnChange:false
        
    })
    
    useEffect(() => {

        if (dataDolar) {
            setDolarOficial(
                dataDolar.filter((unDolar) => {
                    return unDolar.casa.nombre === "Dolar Oficial"
                })
            )
        }
        if (dolarOficial && dolarOficial.length !== 0) {

            setOficial(parseFloat(dolarOficial[0].casa.venta.replace(/,/g, '.')).toFixed(2))
        }

        setTotal(calculadoraDolar((values.cantidad)))

    }, [dataDolar, values])



    const calculadoraDolar = (dolar) => {
        if (dolar < 0) {
            return null

        } else if (dolar < 300) {
            return (dolar * 1.8 * oficial).toFixed(2)
        } else {
            return (dolar * 2 * oficial).toFixed(2)
        }
    }








    return (
        <div>
            <h1>
                Calculadora Dolar Tarjeta
            </h1>
            <form
                onSubmit={handleSubmit}
            >
            <div>
                Cotizacion (DolarSI)
                {
                    oficial
                }
            </div>
                <label htmlFor='Cantidad'>
                    Cantidad
                    <input
                        name='cantidad'
                        type="number"
                        onChange={handleChange}
                        value={values.cantidad}
                    >

                    </input>
                </label>
                <button
                    type='submit'
                >
                    calcular

                </button>
            </form>
            <div>
                Total ( sin Impuestos ) $
                <span>
                    {
                        totalOficial

                    }
                </span>
            </div>
            <div>

                impuesto a las ganancias

                {
                    impuestoGanancias < 30949.87 ?
                        (` 45% menos de 300 usd ${ impuestoGanancias }`)
                        :
                        ( ` 45% + 25% aplica gastando mas de 300 usd ${ impuestoGanancias } ` )

                }
                <span>
                    $
                    {
                        impuestoGanancias

                    }
                </span>

                <div>
                    impuesto Pais 35% { impuestoPais }
                    
                </div>
                <div>
                    Total
                    <span>
                        $
                        {
                            resultado
                        }
                    </span>
                </div>
                

                <div
                >
                    {
                        errors.cantidad

                    }
                </div>
            </div>
        </div >
    )
}

export default Calculadora