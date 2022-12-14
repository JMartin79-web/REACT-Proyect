import React, { useState, useEffect } from "react";

import { getDatos, getCategoryDatos } from "../../services/firebase";
import ItemList from "./ItemList";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";

export default function ItemListContainer(props){

    const [datosList, setdatosList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {categoryid} = useParams()

    useEffect(
        () => {
            setdatosList([])
            if(categoryid===undefined){
                console.log("Se obtuvieron los datos")
                getDatos().then((respuesta) => {
                    setdatosList(respuesta)
                    setIsLoading(false)
                })
            }
            else{
                getCategoryDatos(categoryid).then(
                    (respuesta) => {setdatosList(respuesta)
                    setIsLoading(false)
                })
            }
        }, [categoryid]
    )
        return (
        <>
        {isLoading
            ? 
            <Loader></Loader>  
            : <>
            <h1>{props.greeting}</h1>
            <ItemList datosList={datosList}/> 
            </>   

        }
        
        
        
        </>
        
    )
}