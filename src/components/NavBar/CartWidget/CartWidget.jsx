//impor de todos los iconos => import * as iconList from "@fortawesome/free-solid-svg-icons"; //console.log(iconList)
//2 - Importar componente FontAwsomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 3 - Importar icono deseado de alguna de la libreria de iconos gratuitos
import { faCartShopping }  from "@fortawesome/free-solid-svg-icons";

// importar contexto
import { useContext } from "react";
import { cartContext } from "../../../context/cartContext";



export default function CardWidget(props){
    
    const { getTotalItemsCount } = useContext(cartContext);

    return (
        <>
            <p>Ver Carrito <FontAwesomeIcon icon={faCartShopping}/> { getTotalItemsCount()=== 0 ? "" : getTotalItemsCount()} </p>
            <p></p>
        </>
    )
}