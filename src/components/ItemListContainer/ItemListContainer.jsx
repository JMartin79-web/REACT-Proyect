import React, { useState, useEffect } from "react";


import { getDatos } from "../mockAPI/mockAPI";
import ItemList from "./ItemList";


export default function ItemListContainer(props){

    const [datosList, setdatosList] = useState([])

    useEffect(
        () => {
            console.log("Se obtuvieron los datos")
            getDatos().then((respuesta) => {
                setdatosList(respuesta)
            })
        }, []
    )
        return (
        <>
        <h1>{props.greeting}</h1>
        
        <ItemList datosList={datosList}  />
        </>
        
    )
}