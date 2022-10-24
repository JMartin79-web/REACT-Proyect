import React, {useState} from 'react'
import Button from '../Button/Button'
import ItemCount from '../ItemCount/ItemCount'
import { Link } from "react-router-dom";


// importar contexto
import { useContext } from "react";
import { cartContext } from '../../context/cartContext';
import Loader from '../Loader/Loader';


function ItemDetail({pokemon}) {
    const [count,setCount] = useState(0)
    const {addToCart} = useContext(cartContext)

    function handleOnAdd (count){
        addToCart(pokemon, count)
        setCount(count)
      }

    if(pokemon.id)
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
                    
                    {count===0
                    ? <ItemCount onAdd={handleOnAdd} stock={pokemon.stock} valorInicial={0}></ItemCount>
                    
                    : <Link to="/cart"> <Button children={"Ver carrito"}></Button>
                    </Link>}
                    
                    
                    
                </div>
            </div>
            
        </div>
        
    </>
    )
    return(
        <Loader></Loader>
    )
}

export default ItemDetail