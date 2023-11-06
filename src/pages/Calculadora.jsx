import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useCustomFetchDolar } from '../hooks/useCustomFetchDolar';
import * as Yup from "yup";
import "./pages.css"


const Calculadora = () => {
    // const jsonDolar = useCustomFetchDolar("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    const jsonDolar = useCustomFetchDolar("https://dolarapi.com/v1/dolares")

    const { dataDolar } = !!jsonDolar && jsonDolar;

    console.log(dataDolar)

    const [dolarOficial, setDolarOficial] = useState()
    const [oficial, setOficial] = useState()
    const [impuestoPais, setImpuestoPais] = useState()
    const [impuestoGanancias, setImpuestoGanancias] = useState()
    const [bienespersonales, setBienesPersonales] = useState()
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

    const [totalBluePesos, setTotalBluePesos] = useState()
    const [totalMepPesos, setTotalMepPesos] = useState()
    const [totalAhorroPesos, setotalAhorroPesos] = useState()
    const [totalTarjetaPesos, setTotalTarjetaPesos] = useState()
    const [resultadoBluePesos, setResultadoBluePesos] = useState();
    const [resultadoAhorroPesos, setResultadoAhorroPesos] = useState();
    const [resultadoMepPesos, setResultadoMepPesos] = useState();
    const [resultadoTarjetaPesos, setResultadoTarjetaPesos] = useState();



    const onSubmit = () => {

        setResultado((totalTarjeta * 1).toFixed(2))
        setImpuestoGanancias((values.cantidad * oficial * 0.45).toFixed(2))
        setImpuestoPais((values.cantidad * oficial * 0.30).toFixed(2))
        setTotalOficial((values.cantidad * oficial).toFixed(2))
        setBienesPersonales((values.cantidad * oficial * 0.25).toFixed(2))
        setResultadoBlue(totalBlue)
        setResultadoMep(totalMep)
        setResultadoAhorro(totalAhorro)
        setImpuestoGananciasAhorro((values.cantidad * oficial * 0.35).toFixed(2))
        setResultadoBluePesos(totalBluePesos)
        setResultadoAhorroPesos(totalAhorroPesos)
        setResultadoTarjetaPesos(totalTarjetaPesos)
        setResultadoMepPesos(totalMepPesos)
    }


    const schema = Yup.object().shape({
        cantidad: Yup.number()
            .required('Es necesario insertar una cantidad')
            .positive("Debe introducir un numero mayor a 0")

    });

    const { values, errors, handleChange, handleSubmit, } = useFormik({
        initialValues: {
            cantidad: "",
            tipo: "",
            moneda: ""
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
                    return unDolar.nombre === "Oficial"
                })
            )
        }
        if (dolarOficial && dolarOficial.length !== 0) {

            setOficial(parseFloat(dolarOficial[0].venta).toFixed(2))
        }

        setTotalTarjeta(calculadoraDolarTarjeta((values.cantidad)))

        if (dataDolar) {
            setDolarBlue(
                dataDolar.filter((unDolar) => {
                    return unDolar.nombre === "Blue"
                })
            )
        }
        if (dolarBlue && dolarBlue.length !== 0) {

            setBlue(parseFloat(dolarBlue[0].venta).toFixed(2))
        }
        if (dataDolar) {
            setDolarMep(
                dataDolar.filter((unDolar) => {
                    return unDolar.nombre === "Bolsa"
                })
            )
        }

        if (dolarMep && dolarMep.length !== 0) {

            setMep(parseFloat(dolarMep[0].venta).toFixed(2))
        }

        setTotalBlue(calculadoraDolarBlue((values.cantidad)))
        setTotalMep(calculadoraDolarMep((values.cantidad)))
        setTotalAhorro(calculadoraDolarAhorro((values.cantidad)))


        setTotalBluePesos(calculadoraBluePesos((values.cantidad)))
        setTotalMepPesos(calculadoraMepPesos((values.cantidad)))
        setotalAhorroPesos(calculadoraAhorroPesos((values.cantidad)))
        setTotalTarjetaPesos(calculadoraTarjetaPesos((values.cantidad)))



    }, [dataDolar, values])


    const calculadoraBluePesos = (pesos) => {
        return (pesos / blue).toFixed(2)

    }
    const calculadoraDolarBlue = (dolar) => {
        return (dolar * blue).toFixed(2)
    }


    const calculadoraMepPesos = (pesos) => {
        return (pesos / mep).toFixed(2)

    }
    const calculadoraAhorroPesos = (pesos) => {
        return (pesos / (oficial * 1, 65)).toFixed(2)

    }

    const calculadoraTarjetaPesos = (pesos) => {
        return (pesos / (oficial * 2)).toFixed(2)
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
        }
        else {
            return (dolar * 2 * oficial).toFixed(2)
        }

    }
    return (
        <div className='div-calcu'>
            <h1
                className='title-calc'>
            </h1>
            <div className='container-calcu'>
                <form
                    onSubmit={handleSubmit}
                    className="form-calc">
                    <div className='text-calc-title'>
                        Seleccione la moneda
                    </div>
                    <select
                        name='moneda'
                        value={values.moneda}
                        onChange={handleChange}
                        className="select-calc">
                        <option
                            value={""}
                            disabled selected
                        >
                            Seleccione
                        </option>
                        <option
                            value={"Pesos"}
                        >
                            Pesos a dolares
                        </option>
                        <option
                            value={"Dolares"}
                        >
                            Dolares a pesos
                        </option>

                    </select>
                    <div className='text-calc-title ingrese'>Seleccione el tipo de dolar</div>
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
                            Dolar Tarjeta
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
                    <div className='text-calc-title ingrese'>Ingrese la cantidad de pesos a calcular </div>
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
                        values.moneda === "Pesos" ?
                            (<>
                                {
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
                                                    (
                                                        <div className='text-calc'>
                                                            <div>
                                                                Cotizacion Dolar Tarjeta
                                                            </div>
                                                            <div>
                                                                $ {(oficial * 2).toFixed(2)}
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
                                                            {/* Seleccione un tipo de dolar */}
                                                        </div>

                                                    )
                                }
                                {
                                    values.tipo === "Tarjeta" ?
                                        (
                                            <div>
                                                <div className='text-calc'>
                                                    <div className='div-total'>

                                                        Total
                                                    </div>
                                                    <div>
                                                        U$D {resultadoTarjetaPesos}

                                                    </div>

                                                </div>

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
                                                        U$D {resultadoBluePesos}

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
                                                            U$D {resultadoMepPesos}

                                                        </div>
                                                    </div>
                                                )
                                                :
                                                values.tipo === "Ahorro" ?
                                                    (
                                                        <div>
                                                            <div className='text-calc'>
                                                                <div className='div-total'>
                                                                    Total
                                                                </div>
                                                                <div className='total-final'>
                                                                    U$D {resultadoAhorroPesos}

                                                                </div>
                                                            </div>
                                                            <div className='text-calc' >
                                                                *Unicamente se puede comprar 200 U$D ahorro mensuales por persona.
                                                            </div>
                                                        </div>

                                                    )
                                                    :
                                                    (
                                                        <div>

                                                        </div>
                                                    )
                                }


                                {/* comienza calculadora de dolares*/}
                            </>
                            )
                            :
                            (
                                <>

                                    {
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
                                                        (
                                                            <div className='text-calc'>
                                                                <div>
                                                                    Cotizacion Dolar Tarjeta
                                                                </div>
                                                                <div>
                                                                    $ {(oficial * 2).toFixed(2)}
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
                                                            <>
                                                                {/* Seleccione un tipo de dolar */}
                                                            </>
                                                        )
                                    }

                                    {
                                        values.tipo === "Tarjeta" ?
                                            (
                                                <div>
                                                    <div className='text-calc'>
                                                        <div className='div-total'>

                                                            Total ( Sin Impuestos )
                                                        </div>
                                                        <div>
                                                            $ {totalOficial}

                                                        </div>

                                                    </div>
                                                    <div className='text-calc' >
                                                        <div className='div-total'>
                                                            + 45% impuesto ganancias
                                                        </div>
                                                        <div>
                                                            $ {impuestoGanancias}
                                                        </div>
                                                    </div>
                                                    <div className='text-calc'>
                                                        <div className='div-total'>
                                                            + 30% impuesto Pais
                                                        </div>
                                                        <div>
                                                            $ {impuestoPais}
                                                        </div>
                                                    </div>
                                                    <div className='text-calc'>
                                                        <div className='div-total'>
                                                            + 25% Bienes personales
                                                        </div>
                                                        <div>
                                                            $ {bienespersonales}
                                                        </div>
                                                    </div>
                                                    <div className='text-calc'>
                                                        <div className='div-total total-final'>
                                                            Total ( Con impuestos )
                                                        </div>
                                                        <div className='total-final'>
                                                            $ {resultado}
                                                        </div>

                                                    </div>
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
                                                                    <div className='div-total'>

                                                                        Total ( Con impuestos )
                                                                    </div>
                                                                    <div className='total-final'>
                                                                        $ {resultadoAhorro}

                                                                    </div>
                                                                </div>
                                                                <div className='text-calc' >
                                                                    *Unicamente se puede comprar 200 USD ahorro mensuales por persona.
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <>

                                                            </>
                                                        )
                                    }
                                </>
                            )
                    }

                </form>
            </div>
        </div >
    )
}

export default Calculadora