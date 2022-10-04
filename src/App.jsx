import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
//Componentes de REACT ROUTER DOM
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

// Esto es un componente
function App() {
  return (
    <BrowserRouter>
  
      <NavBar/>
      <ItemDetailContainer/>
      
    </BrowserRouter>
  );
}

export default App;

// <ItemDetailContainer/>
//<ItemListContainer greeting="Bienvenidos"/>