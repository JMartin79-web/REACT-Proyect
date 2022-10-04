import React from 'react'
import Card from "../Card/Card";


function ItemDetail({pokemon}) {
    console.log(pokemon)
    return (
    <>
        <div>
            <p>{pokemon.id}</p>
            <h2>{pokemon.name}</h2>
            <p>{pokemon.price}</p>
            <p>{pokemon.description}</p>
            <img src={pokemon.img} alt={`img-${pokemon.name}`} />
        </div>

    </>
    )
}

export default ItemDetail