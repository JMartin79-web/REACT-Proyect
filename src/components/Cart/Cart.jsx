import React from "react";
import {useContext} from "react"
import { cartContext } from '../../context/cartContext';

function Cart(){
    const { cart } = useContext(cartContext)
    console.log(cart)
    return(
        <>
        <h1>CARRITO</h1>
        {cart.map( (pokemon) => {
            <div>
                <img src={pokemon.img} alt={pokemon.name} />
                <div>
                    <p>{pokemon.number}</p>
                    <p>{pokemon.name}</p>
                    
                </div>
                <div>
                    <p>se esta ejecutando</p>  
                </div>
            </div>
        })}
        </>

    )
}

export {Cart}