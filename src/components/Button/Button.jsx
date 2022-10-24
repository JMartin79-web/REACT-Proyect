import React from 'react'
import { useState} from "react";

function Button(props) {
  function handleClick(){ if(props.onClick) {props.onClick()} }
  return (
    <button onClick={handleClick} className="btn">
        {props.children}
    </button>
  )
}

export default Button