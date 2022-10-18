import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
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
    const [impuestoQatar, setImpuestoQatar] = useState()
    const [total, setTotal] = useState()
    const [resultado, setResultado] = useState()
    const [totalOficial, setTotalOficial] = useState()




    const onSubmit = () => {

        if (values.cantidad < 301) {
            setResultado((total * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.30).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))
            setImpuestoQatar(0)
            
            
        } else {
            setResultado((total * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.30).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))
            setImpuestoQatar((values.cantidad * oficial*0.25).toFixed(2))

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
        validateOnBlur: false,
        validateOnChange: false

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
        <div className='div-calcu'>
            <h1 className='title-calc'>
                Calculadora Dolar Tarjeta
            </h1>
            <div className='container-calcu '>
        <div className='text-calc ingrese'>Ingrese la cantidad de dolares a calcular </div>

                <form
                    onSubmit={ handleSubmit }
                    className="form-calc"
                >

                    <input
                        name='cantidad'
                        type="number"
                        onChange={ handleChange }
                        value={ values.cantidad }
                        className="input-calc"

                    >

                    </input>
                   
                    <button
                        type='submit'
                        className='btn-calcu'
                    >
                        Calcular

                    </button>
                    <div
                    className='text-error'
                >
                    {errors.cantidad}
                </div>
                    <div className='text-calc'>
                        <div>
                            Cotizacion Dolar Oficial
                        </div>
                        <div>
                            $ { oficial }
                        </div>
                    </div>
                </form>
                <div className='text-calc'>
                    <div>

                        Total ( Sin Impuestos )
                    </div>
                    <div>
                        $ { totalOficial }

                    </div>

                </div>
                <div className='text-calc' >
                    <div>
                        + 45% impuesto ganancias
                    </div>
                    <div>
                        $ { impuestoGanancias }
                    </div>
                </div>




                {
                    impuestoQatar > 0 ?
                        (
                            <div className='text-calc' >
                                <div>
                                    + 25% Impuesto Qatar*

                                </div>
                                <div>
                                    $ { impuestoQatar }

                                </div>

                            </div>
                        )
                        :
                        ("")
                }
                <div className='text-calc'>
                    <div>
                        + 30% impuesto Pais
                    </div>
                    <div>
                        $ { impuestoPais }
                    </div>


                </div>
                <div className='text-calc'>
                    <div>

                        Total ( Con impuestos )
                    </div>
                    <div>
                        $ { resultado }

                    </div>

                </div>
                {
                    impuestoQatar > 0 ?
                        (
                            <div className='text-calc' >
                                <div>
                                    *El impuesto Qatar Aplica cuando se superan los USD 300

                                </div>
                                

                            </div>
                        )
                        :
                        ("")
                }
                
            </div>
        </div >
    )
}

export default Calculadora