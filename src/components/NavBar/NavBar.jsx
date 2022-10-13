import CardWidget from "./CartWidget/CartWidget";
import { Link } from "react-router-dom";

export default function NavBar(props){
    
    return (
        <header>
            <Link to="/"><h1>ROCKET SHOP</h1></Link>
            <Link to="/"><CardWidget/></Link>
            
            <h3>Filtrar por tipo</h3>
            <div>
                <Link to="/"><p className="header__link">Ver todos</p></Link>
                <Link to="/category/grass"><p className="header__link">Planta</p></Link>
                <Link to="/category/fire"><p className="header__link">Fuego</p></Link>
                <Link to="/category/water"><p className="header__link">Agua</p></Link>
                <Link to="/category/poison"><p className="header__link">Veneno</p></Link>
                <Link to="/category/flying"><p className="header__link">Volador</p></Link>
                <Link to="/category/bug"><p className="header__link">Bicho</p></Link>
                <Link to="/category/normal"><p className="header__link">Normal</p></Link>
                <Link to="/category/electric"><p className="header__link">Eléctrico</p></Link>
                <Link to="/category/ground"><p className="header__link">Tierra</p></Link>
                <Link to="/category/fighting"><p className="header__link">Lucha</p></Link>
                <Link to="/category/psychic"><p className="header__link">Psíquico</p></Link>
                <Link to="/category/rock"><p className="header__link">Roca</p></Link>
                <Link to="/category/ice"><p className="header__link">Hielo</p></Link>
                <Link to="/category/ghost"><p className="header__link">Fantasma</p></Link>
                <Link to="/category/dragon"><p className="header__link">Dragón</p></Link>
            </div>
            

            
        </header>
    )
}
