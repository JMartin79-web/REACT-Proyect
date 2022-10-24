import React from 'react'
import { useState } from 'react'
import Button from '../Button/Button'
import InputForm from './InputForm'
import { createBuyOrder } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';

function Form({cart, getTotalPrice,handleRemoveAll}) {
  const navigate = useNavigate()
  const [buyerData, setBuyerData] = useState({
    name: "",
    surname: "",
    mail: "",
    phone: "",
  })

  function onInputChange(evento){
    const name = evento.target.name
    const value = evento.target.value

    let newBuyerData = {...buyerData}
    newBuyerData[name] = value
    setBuyerData(newBuyerData)
  }

  function onSubmit(evento){
    evento.preventDefault();
    
    const orderData = {
      buyerData: buyerData,
      cart: cart,
      total: getTotalPrice(),
      date: new Date(),
    };

    createBuyOrder(orderData)
    handleRemoveAll()
    navigate("../thankyou")
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className='form-contenedor'>
        <div className='form-div1'>
          <InputForm onChange={onInputChange} value={buyerData.name} name="name" tittle="Nombre" required={true} ></InputForm>
          <InputForm onChange={onInputChange} value={buyerData.surname} name="surname" tittle="Apellido" required={true} ></InputForm>
        </div>

        <div className='form-div2'>
          <InputForm onChange={onInputChange} value={buyerData.mail} name="mail" tittle="Mail" required={true} ></InputForm>
          <InputForm onChange={onInputChange} value={buyerData.phone} name="phone" tittle="Teléfono" required={true} ></InputForm>
        </div>
      </div>

      <Button>Terminar compra</Button>
    </form>
  )
}

export default Form