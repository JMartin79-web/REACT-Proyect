import React from 'react'
import { useState} from "react";

function Button(props) {
    const [colorBtn,setColorBtn] = useState({ backgroundColor: "rgb(218, 46, 54)" })

  function handleClick(){ if(props.onClick) {props.onClick()} }
  return (
    <button onClick={handleClick} className="btn">
        {props.children}
    </button>
  )
}

export default Button