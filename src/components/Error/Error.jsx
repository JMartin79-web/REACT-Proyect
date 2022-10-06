import React from 'react'
import this_is_fine from "../assets/this_is_fine.gif"

function Error() {
  return (
    <>
    <div>
        <div>
            <h1>UPS!</h1>
            <img src={this_is_fine} alt="" />
        </div>
    </div>
   
    <div className='error__div'>
        <p>Error 404(not found)</p>
        <p> Ocurrió un error. No se encontró la página</p>
    </div>
    </>
    
  )
}

export default Error