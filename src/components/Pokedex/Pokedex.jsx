import PokedexList from "../PokedexList/PokedexList";
import Search from "../Search/Search";
import './Pokedex.css'

function Pokedex(){

    return (
        <div className="pokedex-wrapper">
            
            <Search />
            <PokedexList />
        </div>
    )
}

export default Pokedex;