import React, {createContext, useState} from "react";

const cartContext = createContext();

function CartContextProvider(props){

    const [cart, setCart] = useState([])

    function addToCart(item, count){
        if(isInCart(item.id)){
            cart.map( (pokemon) => {
                if(pokemon.id === item.id){ pokemon.count += count}
            })
            let newCart = [...cart]
            setCart(newCart)
        }
        else{
            let newCart = [...cart]
            let newItem = {...item, count}
            newCart.push(newItem)
            setCart(newCart)
        }
    }
    

    function getTotalPrice(){
        let precioFinal = 0;
        cart.forEach(item =>{
            precioFinal += (item.count * item.price)
        })
        return precioFinal
    }


    function getTotalItemsCount(){
        let totalItemsCount = 0;
        cart.forEach(item =>{
            totalItemsCount += item.count
        })
        return(totalItemsCount)
    }
    

    function removeItem(idToRemove){
        let newCart = cart.filter( item => (item.id !== idToRemove ))
        setCart(newCart)
    }


    function clear(){ setCart([]) }

    
    function isInCart(id){
        let encontrado = cart.find(item => (item.id === id))
        return encontrado
    }

    return(
        <>

        <cartContext.Provider value={ {cart, addToCart, getTotalItemsCount, removeItem, clear, isInCart, getTotalPrice} }>
            {props.children}
        </cartContext.Provider>
        
        </>
    )
}

export { cartContext, CartContextProvider }