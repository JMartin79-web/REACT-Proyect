import React, { useState } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping }  from "@fortawesome/free-solid-svg-icons";
function ItemCount({stock, valorInicial, onAdd}) {
    const menos = "-"
    const mas = "+"

    const [count, setCount] = useState(valorInicial);

    function handleSubstract() {if (count > 1) {setCount(count - 1)} }
    function handleAdd() {if (count < stock) {setCount(count + 1)} }

    
  return (
    <>
   
    <div className="itemcount">
      <div className="itemcount__operaciones">
        <Button onClick={handleAdd} children={mas} className="itemcount-btn"></Button>
        <Button onClick={handleSubstract} children={menos} className="itemcount-btn"></Button>
      </div>
      
      <h3>{count}</h3>
    </div>
    <Button onClick={ () => {onAdd(count)}} disabled={count===0 ? true : false} children={<FontAwesomeIcon icon={faCartShopping}/>}></Button>
    </>
    
  ) 
}
export default ItemCount

