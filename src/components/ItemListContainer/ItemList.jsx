import React from 'react'
import Card from "../Card/Card";

export default function ItemList(props) {
  console.log(props)
  return (
    <div className="displayCards">
        {props.datosList.map( (pokemon) => {
            
            return(
                
                <Card
                id={pokemon.id}
                key={pokemon.id}
                precio= {`$${pokemon.price}`}
                name= {pokemon.name}
                
                src={pokemon.img}
                alt= {pokemon.name}
                />
            )
        })}
    </div>
  )
}

