import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getDato } from '../mockAPI/mockAPI'
import ItemDetail from './ItemDetail'


function ItemDetailContainer(props) {
    const [dato, setDato] = useState([])

    useEffect(
        () => {
            console.log("ESTA FUNCIONANDO")
            getDato().then( (res)=>{ setDato(res)} )
        }
    )
  return (
    <>
    <ItemDetail pokemon={dato}/>
    </>
  )
}

export default ItemDetailContainer
