
export default function Card(props){
    return(
        <>
        <div className="card">
            <img src={props.src} alt={props.alt}/>
            <div>
                <h4>{props.precio}</h4>
                <p>{props.name}</p>
            </div>
        </div>
        </>
    )
}
