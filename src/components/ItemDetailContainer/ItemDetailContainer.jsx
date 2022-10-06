import React, { useEffect, useState } from 'react'
import { getDato } from '../mockAPI/mockAPI'
import ItemDetail from './ItemDetail'
import {useParams} from "react-router-dom";

function ItemDetailContainer(props) {
    const [dato, setDato] = useState([]);
    const {id} = useParams();
    useEffect(
        () => {
            console.log("ESTA FUNCIONANDO")
            getDato(id).then( (res)=>{ setDato(res)} )
        } ,[id]
    )
  return (
    <>
    <ItemDetail pokemon={dato}/>
    </>
  )
}

export default ItemDetailContainer
