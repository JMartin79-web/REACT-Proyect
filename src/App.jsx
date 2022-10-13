import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";

//Componentes de REACT ROUTER DOM
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Error from "./components/Error/Error";
// Carrito
import { Cart } from "./components/Cart/Cart";
// import contexto
import {CartContextProvider} from "./context/cartContext"


// Esto es un componente
function App() {
  return (
    <CartContextProvider>
    <BrowserRouter>
  
      <NavBar/>

      <Routes>
        
        {/* INICIO */}
        <Route path="/" element={<ItemListContainer greeting="Bienvenidos"/>}/>
        
        {/* CATEGORÍA */}
        <Route path="/category/:categoryid" element={<ItemListContainer greeting="Bienvenidos"/>}/>

        {/* DETALLE */}
        <Route path="/item/:id" element={<ItemDetailContainer/>}/>
        
        {/* CRRITO */}
        <Route path="/cart" element={<Cart/>}/>

        {/* ERROR 404 */}
        <Route path="*" element={ <Error></Error> }/>

      </Routes>
      
    </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;

// <ItemDetailContainer/>
//<ItemListContainer greeting="Bienvenidos"/>