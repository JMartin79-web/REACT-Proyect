import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import thxs from "../assets/thxs.gif"
function Thankyou() {
  return (
    <>
    <div>
        <div>
            <h1>Gracias por tu compra!</h1>
            <img src={thxs} alt="gracias" />
        </div>
    </div>
   
    <div className='error__div'>
        <p>Esperamos que disfrutes de tus nuevos pokemons</p>
        <Link to="../../"> <Button>Volver a comprar</Button> </Link>
    </div>
    </>
  )
}

export default Thankyou