import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function Card(props){
    return(
        <>
        <div className="card">
            <img src={props.src} alt={props.alt}/>
            <div className="card__info">
                <div>
                    <h4>{props.precio}</h4>
                    <p>{props.name}</p>
                </div>

                <div>
                    <Link to={`/item/${props.id}`}>
                    <Button children="Ver detalles"></Button>
                    </Link>
                </div>
                
            </div>
        </div>
        </>
    )
}
