import Cards from "./Cards/Cards";

export default function ItemListContainer(props){

    return (
        <>
        <h1>{props.greeting}</h1>
        <Cards/>
        </>
        
    )
}