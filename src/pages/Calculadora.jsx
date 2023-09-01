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
    const [totalTarjeta, setTotalTarjeta] = useState()
    const [resultado, setResultado] = useState()
    const [totalOficial, setTotalOficial] = useState()
    const [totalBlue, setTotalBlue] = useState()
    const [dolarBlue, setDolarBlue] = useState()
    const [blue, setBlue] = useState()
    const [resultadoBlue, setResultadoBlue] = useState()
    const [resultadoAhorro, setResultadoAhorro] = useState()
    const [totalAhorro, setTotalAhorro] = useState()
    const [impuestoGananciasAhorro, setImpuestoGananciasAhorro] = useState()
    const [mep, setMep] = useState()
    const [resultadoMep, setResultadoMep] = useState()
    const [totalMep, setTotalMep] = useState()
    const [dolarMep, setDolarMep] = useState()





    const onSubmit = () => {

        if (values.cantidad < 301) {
            setResultado((totalTarjeta * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.30).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))
            setImpuestoQatar(0)

        } else {

            setResultado((totalTarjeta * 1).toFixed(2))
            setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
            setImpuestoPais((values.cantidad * oficial * 0.30).toFixed(2))
            setTotalOficial((values.cantidad * oficial).toFixed(2))
            setImpuestoQatar((values.cantidad * oficial * 0.05).toFixed(2))

        }

        setResultadoBlue(totalBlue)
        setResultadoMep(totalMep)
        setResultadoAhorro(totalAhorro)
        setImpuestoGananciasAhorro((values.cantidad * oficial * 0.35).toFixed(2))
    }


    const schema = Yup.object().shape({
        cantidad: Yup.number()
            .required('Es necesario insertar una cantidad')
            .positive("Debe introducir un numero mayor a 0")

    });

    const { values, errors, handleChange, handleSubmit, } = useFormik({
        initialValues: {
            cantidad: "",
            tipo: ""
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

        setTotalTarjeta(calculadoraDolarTarjeta((values.cantidad)))

        if (dataDolar) {
            setDolarBlue(
                dataDolar.filter((unDolar) => {
                    return unDolar.casa.nombre === "Dolar Blue"
                })
            )
        }
        if (dolarBlue && dolarBlue.length !== 0) {

            setBlue(parseFloat(dolarBlue[0].casa.venta.replace(/,/g, '.')).toFixed(2))
        }
        if (dataDolar) {
            setDolarMep(
                dataDolar.filter((unDolar) => {
                    return unDolar.casa.nombre === "Dolar Bolsa"
                })
            )
        }

        if (dolarMep && dolarMep.length !== 0) {

            setMep(parseFloat(dolarMep[0].casa.venta.replace(/,/g, '.')).toFixed(2))
        }





        setTotalBlue(calculadoraDolarBlue((values.cantidad)))

        setTotalMep(calculadoraDolarMep((values.cantidad)))

        setTotalAhorro(calculadoraDolarAhorro((values.cantidad)))

    }, [dataDolar, values])


    const calculadoraDolarBlue = (dolar) => {
        return (dolar * blue).toFixed(2)
    }


    const calculadoraDolarMep = (dolar) => {
        return (dolar * mep).toFixed(2)
    }


    const calculadoraDolarAhorro = (dolar) => {
        return (dolar * oficial * 1.65).toFixed(2)
    }

    const calculadoraDolarTarjeta = (dolar) => {
        if (dolar < 0) {
            return null

        } else if (dolar <= 300) {
            return (dolar * 1.75 * oficial).toFixed(2)
        } else {
            return (dolar * 1.8 * oficial).toFixed(2)
        }
    }


    return (
        <div className='div-calcu'>
            <h1 className='title-calc'>
                Calculadora de Dolar
            </h1>
            <div className='container-calcu '>
                <form
                    onSubmit={handleSubmit}
                    className="form-calc">
                    <div className='text-calc'>
                        Seleccione el tipo de dolar
                    </div>

                    <select
                        name='tipo'
                        value={values.tipo}
                        onChange={handleChange}
                        className="select-calc">
                        <option
                            value={""}
                            disabled selected


                        >
                            Seleccione
                        </option>
                        <option
                            value={"Tarjeta"}
                        >
                            Dolar Tarjeta/Qatar
                        </option>
                        <option
                            value={"Blue"}
                        >
                            Dolar Blue
                        </option>
                        <option
                            value={"Ahorro"}
                        >
                            Dolar Ahorro
                        </option>
                        <option
                            value={"Mep/Bolsa"}
                        >
                            Dolar Mep/Bolsa
                        </option>
                    </select>

                    <div className='text-calc ingrese'>Ingrese la cantidad de dolares a calcular </div>


                    <input
                        name='cantidad'
                        type="number"
                        onChange={handleChange}
                        value={values.cantidad}
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

                    {
                        values.tipo === "Dolar Mep/Bolsa" ?
                            (
                                <>

                                    <div className='text-calc'>
                                        <div>
                                            Cotizacion Dolar Oficial
                                        </div>
                                        <div>
                                            $ {oficial}
                                        </div>
                                    </div>
                                    <div className='text-calc'>
                                        <div>
                                            Cotizacion Dolar Blue
                                        </div>
                                        <div>
                                            $ {blue}
                                        </div>
                                    </div>
                                </>
                            )
                            :

                            values.tipo === "Tarjeta" ?
                                (
                                    <>

                                        <div className='text-calc'>
                                            <div>
                                                Cotizacion Dolar Oficial
                                            </div>
                                            <div>
                                                $ {oficial}
                                            </div>
                                        </div>
                                        {
                                            impuestoQatar > 0 ?
                                                (
                                                    <div className='text-calc'>
                                                        <div>
                                                            Cotizacion Dolar Qatar
                                                        </div>
                                                        <div>
                                                            $ {(oficial * 1.8).toFixed(2)}
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='text-calc'>
                                                        <div>
                                                            Cotizacion Dolar Tarjeta
                                                        </div>
                                                        <div>
                                                            $ {(oficial * 1.75).toFixed(2)}
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </>
                                )
                                :
                                values.tipo === "Blue" ?

                                    (
                                        <>

                                            <div className='text-calc'>
                                                <div>
                                                    Cotizacion Dolar Oficial
                                                </div>
                                                <div>
                                                    $ {oficial}
                                                </div>
                                            </div>
                                            <div className='text-calc'>
                                                <div>
                                                    Cotizacion Dolar Blue
                                                </div>
                                                <div>
                                                    $ {blue}
                                                </div>
                                            </div>
                                        </>
                                    )
                                    :
                                    values.tipo === "Mep/Bolsa" ?

                                        (
                                            <>

                                                <div className='text-calc'>
                                                    <div>
                                                        Cotizacion Dolar Oficial
                                                    </div>
                                                    <div>
                                                        $ {oficial}
                                                    </div>
                                                </div>
                                                <div className='text-calc'>
                                                    <div>
                                                        Cotizacion Dolar Mep/Bolsa
                                                    </div>
                                                    <div>
                                                        $ {mep}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                        :
                                        values.tipo === "Ahorro" ?
                                            (

                                                <>

                                                    <div className='text-calc'>
                                                        <div>
                                                            Cotizacion Dolar Oficial
                                                        </div>
                                                        <div>
                                                            $ {oficial}
                                                        </div>
                                                    </div>
                                                    <div className='text-calc'>
                                                        <div>
                                                            Cotizacion Dolar Ahorro
                                                        </div>
                                                        <div>
                                                            $ {(oficial * 1.65).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            :
                                            (
                                                <div className='text-calc'>
                                                    Seleccione un tipo de dolar
                                                </div>

                                            )

                    }
                </form>
                {
                    values.tipo === "Tarjeta" ?
                        (
                            <div>
                                <div className='text-calc'>
                                    <div>

                                        Total ( Sin Impuestos )
                                    </div>
                                    <div>
                                        $ {totalOficial}

                                    </div>

                                </div>
                                <div className='text-calc' >
                                    <div>
                                        + 45% impuesto ganancias
                                    </div>
                                    <div>
                                        $ {impuestoGanancias}
                                    </div>
                                </div>
                                <div className='text-calc'>
                                    <div>
                                        + 30% impuesto Pais
                                    </div>
                                    <div>
                                        $ {impuestoPais}
                                    </div>
                                </div>
                                {
                                    impuestoQatar > 0 ?
                                        (
                                            <div className='text-calc' >
                                                <div>
                                                    + 5% Impuesto Qatar*

                                                </div>
                                                <div>
                                                    $ {impuestoQatar}

                                                </div>

                                            </div>
                                        )
                                        :
                                        ("")
                                }
                                <div className='text-calc'>
                                    <div>
                                        Total ( Con impuestos )
                                    </div>
                                    <div>
                                        $ {resultado}
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
                        )
                        :
                        values.tipo === "Blue" ?
                            (
                                <div className='text-calc'>
                                    <div>

                                        Total
                                    </div>
                                    <div>
                                        $ {resultadoBlue}

                                    </div>
                                </div>
                            )
                            :
                            values.tipo === "Mep/Bolsa" ?
                                (
                                    <div className='text-calc'>
                                        <div>

                                            Total
                                        </div>
                                        <div>
                                            $ {resultadoMep}

                                        </div>
                                    </div>
                                )
                                :
                                values.tipo === "Ahorro" ?
                                    (
                                        <div>


                                            <div className='text-calc'>
                                                <div>

                                                    Total ( Sin Impuestos )
                                                </div>
                                                <div>
                                                    $ {totalOficial}

                                                </div>

                                            </div>
                                            <div className='text-calc' >
                                                <div>
                                                    + 35% impuesto ganancias
                                                </div>
                                                <div>
                                                    $ {impuestoGananciasAhorro}
                                                </div>
                                            </div>
                                            <div className='text-calc'>
                                                <div>
                                                    + 30% impuesto Pais
                                                </div>
                                                <div>
                                                    $ {impuestoPais}
                                                </div>


                                            </div>
                                            <div className='text-calc'>
                                                <div>

                                                    Total ( Con impuestos )
                                                </div>
                                                <div>
                                                    $ {resultadoAhorro}

                                                </div>
                                            </div>

                                        </div>


                                    )
                                    :
                                    (
                                        ""
                                    )
                }
            </div>
        </div >
    )
}

export default Calculadora