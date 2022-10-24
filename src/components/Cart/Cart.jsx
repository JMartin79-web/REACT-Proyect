import React, { useState } from "react";

import {useContext} from "react";
import { cartContext } from '../../context/cartContext';

import { Link } from "react-router-dom";
import run from "../assets/run.gif"
import Button from "../Button/Button";
import Form from '../Form/Form'

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan }  from "@fortawesome/free-solid-svg-icons";

function Cart(){
    const { cart, clear, removeItem, getTotalPrice } = useContext(cartContext)
    const [form,setForm] = useState(0)

    function handleRemove(pokemonID){
        let pkmID = pokemonID
        removeItem(pkmID)
    }

    function handleRemoveAll(){
        clear()
    }

    function crearForm(){setForm(1)}
    
    if(cart[0])

    return(
        <>
        <h1>CARRITO</h1>

        <div className="cart-header">
            <h2>Precio final: {getTotalPrice()} </h2>
            <div className="cart-header-div">
            <Button onClick={crearForm}>Crear orden</Button>
            <Button onClick={handleRemoveAll} >Eliminar todos</Button>
            </div>
            
        </div>
        {form === 1
        ? <div> <Form cart={cart} getTotalPrice={getTotalPrice} handleRemoveAll={handleRemoveAll} ></Form> </div>
        : <div></div>
        }
        <div className="cart">
        
        
        {
            cart.map( (pokemon)=>{
                let precioTotal = pokemon.price * pokemon.count;
                
                return(
                <div key={pokemon.id} className="cart-card">

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
