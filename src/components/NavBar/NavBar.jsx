import CardWidget from "./CartWidget/CartWidget";
import { Logo, NavBarLink } from "./NavBarElement/NavBarElement";


export default function NavBar(props){
    return (
        <header>
            <Logo link="#"  texto="ROCKET SHOP"/>
            <NavBarLink link="#" texto="Pokemons"/>
            <NavBarLink link="#" texto="PlaceHolder"/>
            <NavBarLink link="#" texto="PlaceHolder2"/>
            <CardWidget link="#"/>
        </header>
    )
}