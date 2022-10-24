import React from 'react'

function Button(props) {
  function handleClick(){ if(props.onClick) {props.onClick()} }
  return (
    <button onClick={handleClick} className="btn" disabled={props.disabled} >
        {props.children}
    </button>
  )
}

export default Button