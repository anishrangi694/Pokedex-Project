import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){

    const {id}=useParams();
    const [pokemon,setPokemon]= useState({})
    console.log(id)

    async function downloadPokeDetails(){
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        console.log(response);

        setPokemon({
            name:response.data.name,
            image:response.data.sprites.front_shiny,
            weight: response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=> t.type.name)
        }) 
    }

    useEffect(()=>{
        downloadPokeDetails()
    },[])

    const navigate= useNavigate();
    return (
        <div className="pokemon-details-wrapper">
           
           <div className="pokemon-name name">{pokemon.name}</div>
           <div className="pokemon-image"><img src={pokemon.image}/></div> 
           <div className="pokemon-name">Weight:{pokemon.weight}</div>
           <div className="pokemon-name">Height:{pokemon.height}</div>
           <div className="pokemon-types">Types:
                                 {pokemon.types && pokemon.types.map((t)=> 
                                 <div key={t}>{t}</div>)}
                                </div>

           <button onClick={()=>{navigate('/')}}>Back</button>
        </div>
    )
}

export default PokemonDetails;