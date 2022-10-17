import { useState, useEffect} from "react";



export const useCustomFetchDolar = (url) => {

    const [state, setState] = useState({
        dataDolar: null,
    });

    useEffect(() => {
        setState({
            ...state,
        });

        fetch(url)
            .then(res => res.json())
            .then(dataDolarApi => setState({
                dataDolar: dataDolarApi,
            }))
            .catch(err => {
                setState({
                    dataDolar: null,
                })
            })

    }, [url])

    return {
        dataDolar: state.dataDolar,
    }


}