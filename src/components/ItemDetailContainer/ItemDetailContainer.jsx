import React, { useEffect, useState } from 'react'
import { getDato } from '../../services/firebase'
import ItemDetail from './ItemDetail'
import {useParams} from "react-router-dom";

function ItemDetailContainer(props) {
    const [dato, setDato] = useState({});
    const [feedbackMsj, setFeedbackMsj] = useState(null)
    const {id} = useParams();

    useEffect(
        () => {
            
            getDato(id)
            .then( (res)=>{ setDato(res)} )
            .catch( (error) => { setFeedbackMsj(error.message)})
        } ,[id]
    )
  return (
    <>
    { feedbackMsj !== null
    ? <h4>Error: {feedbackMsj} </h4>
    : <ItemDetail pokemon={dato}/>
    }
    </>
  )
}

export default ItemDetailContainer
