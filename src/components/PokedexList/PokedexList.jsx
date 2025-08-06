import { useEffect, useState } from "react"
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokedexList.css'

function PokedexList(){

    const [pokemonListState, setPokemonListState]= useState({
        isLoading:true,
        pokemonList:[],
        pokedexUrl:"https://pokeapi.co/api/v2/pokemon",
        nextUrl:'',
        prevUrl:''
    });
   
    async function downloadPokemons(){
  
        setPokemonListState({...pokemonListState,isLoading:true})
        const response= await axios.get(pokemonListState.pokedexUrl);
        console.log(response)
        const pokemonResult= response.data.results;
        

        setPokemonListState((state)=>({
            ...state,
            prevUrl:response.data.previous,
            nextUrl:response.data.next
        }))

        const pokemonResultPromises=pokemonResult.map((pokemon)=> 
            axios.get(pokemon.url));

        const pokemonData= await axios.all(pokemonResultPromises);

        console.log(pokemonData);
        const res= pokemonData.map((pokeData)=>{
            const pokemon= pokeData.data;
            return {
                 name: pokemon.name,
                 id: pokemon.id,
                 type:pokemon.types,
                 image:pokemon.sprites.front_shiny
            }
               
            
        });

        console.log(res);
        
        setPokemonListState((state)=>({
            ...state,
            isLoading:false,
            pokemonList:res
        }))
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl])


    return(
        <div className="pokedexList-wrapper">
            <div className="pokilist-heading">Pokedex List</div>
            <div className="pokeList">
                {(pokemonListState.isLoading)?'Loading....':
                   
                    pokemonListState.pokemonList.map((p)=>
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>
                    )
                }
            
            </div>

            <div className="controls">
                <button disabled={pokemonListState.prevUrl==null} 
                        onClick={()=>setPokemonListState({
                            ...pokemonListState,pokedexUrl:pokemonListState.prevUrl})}>Prev
                            </button>
                <button disabled={pokemonListState.nextUrl==null} 
                        onClick={()=>setPokemonListState({
                            ...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}>Next
                            </button>
            </div>
        </div>
    )
}

export default PokedexList;