import React, {useState} from 'react'
import Button from '../Button/Button'
import ItemCount from '../ItemCount/ItemCount'


function ItemDetail({pokemon}) {
    console.log(pokemon.stock)
    const [count,setCount] = useState(0)


    function handleOnAdd (count){
        console.log("Agregaste al carrito "+ count )
        setCount(count)
      }
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
                    
                    : <Button children={"Ver carrito"}></Button>}
                    
                    
                </div>
            </div>
            
        </div>
        
    </>
    )
}

export default ItemDetail