import React from 'react'
import loading from "../assets/loading.gif"
function Loader() {
  return (
    <div className='loader'>
        <img src={loading} alt="loading"/>
        <p>Cargando</p>
    </div>
  )
}

export default Loader