import React from 'react'
import { useState} from "react";

function Button(props) {
    const [colorBtn,setColorBtn] = useState({ backgroundColor: "rgb(218, 46, 54)" })
    
    function handleClick() {
        setColorBtn({ backgroundColor: "rgb(3, 121, 113)" });
      }

  return (
    <button style={colorBtn} className="btn">
        {props.children}
    </button>
  )
}

export default Button