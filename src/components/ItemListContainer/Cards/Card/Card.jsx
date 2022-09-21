export default function Card(props){
    return(
        <div className="card">
        <img src={props.src} alt={props.alt}/>
        <div>
            <h4>{props.h4}</h4>
            <p>{props.p}</p>
        </div>
        </div>
    )   
}
