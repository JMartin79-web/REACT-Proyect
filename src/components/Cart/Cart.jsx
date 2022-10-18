import React, { useState, useEffect } from "react";

import {useContext} from "react";
import { cartContext } from '../../context/cartContext';

import { Link } from "react-router-dom";
import run from "../assets/run.gif"
import Button from "../Button/Button";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan }  from "@fortawesome/free-solid-svg-icons";
function Cart(){
    const { cart, clear, removeItem } = useContext(cartContext)

    function precioFinalHeader(){
        let precioFinalHeader = 0;
        cart.forEach(item =>{
            precioFinalHeader += (item.count * item.price)
        })
        return(precioFinalHeader)
    }
    function handleRemove(pokemonID){
        let pkmID = pokemonID
        removeItem(pkmID)
    }

    function handleRemoveAll(){
        clear()
    }

    function handleEnd(){
        console.log("Compra terminada")
    }

    if(cart[0])

    return(
        <>
        <h1>CARRITO</h1>

        <div className="cart-header">
            <h2>Precio final: {precioFinalHeader} </h2>
            <div className="cart-header-div">
            <Button onClick={handleEnd} >Terminar compra</Button>
            <Button onClick={handleRemoveAll} >Eliminar todos</Button>
            </div>
            
        </div>

        <div className="cart">
        
        
        {
            cart.map( (pokemon)=>{
                let precioTotal = pokemon.price * pokemon.count;
                
                return(
                <div className="cart-card">

                    <div className="card-div-img">
                        <img src= {pokemon.img} alt={`img-${pokemon.name}`} />
                    </div>

                    <div className="card-div-txt">
                        
                        <h2> {pokemon.name} </h2>
                        <div className="card-div-txt2">
                            <p>Cantidad: {pokemon.count} </p>
                            <p>Precio total: {precioTotal} </p>
                        </div>
                    </div>

                    <div className="card-div-btn">
                        
                        <Button onClick= { () => handleRemove(pokemon.id) }>
                                <FontAwesomeIcon icon={faTrashCan}/>
                        </Button>
                    </div>

                </div>
                )
                
            })
        }
        

        </div>
        
        </>
    )
    return(
        <>
         <h1>CARRITO</h1>

        <div className="cart-header">
            <h2>Tu carrito está vacío</h2>
            
        </div>
            <p>Corré a llenarlo</p>
            <img className="vacio-img" src= {run} alt="pikachu corriendo"/>
            <Link to="../"> <Button>Volver al listado</Button> </Link>
        
        </>
    )
}

export {Cart}

/*
 return(
        <>
        {setCartVacio(true)}
        <h1>CARRITO</h1>
        <p>Tu carrito está vació.</p>
        <p>Corré a llenarlo <img src= {run} alt="pikachu corriendo" /> </p>
        </>
    )
*/