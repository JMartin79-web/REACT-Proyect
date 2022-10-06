import React from 'react'
import Button from '../Button/Button'
import ItemCount from '../ItemCount/ItemCount'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping }  from "@fortawesome/free-solid-svg-icons";

function ItemDetail({pokemon}) {
    console.log(pokemon.stock)
    return (
    <>
        <div className='itemdetail'>
            <div className='itemdetail-img'>
                <img src={pokemon.img} alt={`img-${pokemon.name}`} />
            </div>

            <div className='itemdetail-txt'>
                <h2 className='itemdetail-txt-h2'>{pokemon.name}</h2>
                <p className='itemdetail-txt-precio'>Precio: ${pokemon.price}</p>
                <p>{pokemon.description}</p>
                <div className='itemdetail-btn'>
                    <ItemCount stock={pokemon.stock} valorInicial={1}></ItemCount>
                    <Button children={<FontAwesomeIcon icon={faCartShopping}/>}></Button>
                </div>
            </div>
            
        </div>
        
    </>
    )
}

export default ItemDetail