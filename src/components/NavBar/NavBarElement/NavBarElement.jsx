
export function Logo(props){
    return(
        <a href={props.link}><h1>{props.texto}</h1></a> 
    )
};

export function NavBarLink(props){
    return(
        <a href={props.link}>{props.texto}</a>
    )
}