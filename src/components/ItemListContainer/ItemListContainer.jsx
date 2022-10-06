import React, { useState, useEffect } from "react";


import { getDatos, getCategoryDatos } from "../mockAPI/mockAPI";
import ItemList from "./ItemList";
import {useParams} from "react-router-dom";

export default function ItemListContainer(props){

    const [datosList, setdatosList] = useState([])
    const {categoryid} = useParams()

    useEffect(
        () => {
            {/* cuando el category no esta definido, entonces significa que estamos en el directorio raíz */}
            if(categoryid===undefined){
                console.log("Se obtuvieron los datos")
                getDatos().then((respuesta) => {
                    setdatosList(respuesta)
                })
            }
            else{
                getCategoryDatos(categoryid).then(
                    (respuesta) => {setdatosList(respuesta)
                })
            }
        }, [categoryid]
    )
        return (
        <>
        <h1>{props.greeting}</h1>
        
        <ItemList datosList={datosList}  />
        </>
        
    )
}