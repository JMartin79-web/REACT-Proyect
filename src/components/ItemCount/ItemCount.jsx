import React, { useState } from "react";
import Button from "../Button/Button";

function ItemCount({stock, valorInicial}) {
    const menos = "-"
    const mas = "+"

    const [count, setCount] = useState(valorInicial);

    function handleSubstract() {if (count > 1) {setCount(count - 1)} }
    function handleAdd() {if (count < stock) {setCount(count + 1)} }

  return (
    <>
   
    <div className="itemcount">
      <div className="itemcount__operaciones">
        <button onClick={handleAdd} children={mas} className="itemcount-btn"></button>
        <button onClick={handleSubstract} children={menos} className="itemcount-btn"></button>
      </div>
      
      <h3>{count}</h3>
    </div>
    </>
    
  )
}
export default ItemCount

