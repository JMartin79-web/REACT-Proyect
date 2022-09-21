//2 - Importar componente FontAwsomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 3 - Importar icono deseado de alguna de la libreria de iconos gratuitos
import { faCartShopping }  from "@fortawesome/free-solid-svg-icons";

//import * as iconList from "@fortawesome/free-solid-svg-icons";

export default function CardWidget(props){
    //console.log(iconList)
    return (
    <a href={props.link}>Ver Carrito <FontAwesomeIcon icon={faCartShopping}/></a>
    )
}