import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
//Componentes de REACT ROUTER DOM
import { BrowserRouter, Route, Routes} from "react-router-dom";

// Esto es un componente
function App() {
  return (
    <BrowserRouter></BrowserRouter>
  <>
   <NavBar/>
   <ItemListContainer greeting="Bienvenidos"/>
  </>
  );
}

export default App;
