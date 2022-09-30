import React, { useState, useEffect } from "react";

import Card from "./Card/Card";
import { getDatos } from "../mockAPI/mockAPI";


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
        
        <div className="displayCards">
        {datosList.map( (pokemon) => {
            
            return(
                
                <Card
                key={pokemon.id}
                precio= {pokemon.price}
                name= {pokemon.name}
                
                src={pokemon.img}
                alt= {pokemon.name}
                />
            )
        })}

        </div>
        </>
        
    )
}