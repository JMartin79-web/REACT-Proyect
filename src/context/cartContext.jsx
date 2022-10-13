import React, {createContext, useState} from "react";

const cartContext = createContext();

function CartContextProvider(props){

    const [cart, setCart] = useState([])

    function addToCart(item, count){
        let newCart = [...cart]
        let newItem = {...item, count}
        newCart.push(newItem)
        setCart(newCart)
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

    function clear(){
        setCart([])
    }

    function isInCart(id){
        cart.find(item => (item.id === id))

    }

    return(
        <>

        <cartContext.Provider value={ {cart, addToCart, getTotalItemsCount, removeItem, clear, isInCart} }>
            {props.children}
        </cartContext.Provider>
        
        </>
    )
}

export { cartContext, CartContextProvider }