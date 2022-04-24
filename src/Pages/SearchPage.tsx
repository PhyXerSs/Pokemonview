import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { allPokemonDataState } from '../StateManagement/Atoms';
import { allPokemonData } from '../type/type';

function SearchPage() {

    const params = useParams();
    const allPokemonData = useRecoilValue(allPokemonDataState);
    const [ pokemonData , setPokemonData ] = useState<allPokemonData | null>(null);
    useEffect(()=>{
        allPokemonData?.forEach((pokemon)=>{ 
            if(pokemon.name === params.id){
                console.log(pokemon.name)
                setPokemonData(pokemon);
            }
        })
        
        
    },[params.id])
    // console.log(pokemonData);
    
    return (
        <div className="mt-40 w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center shadow-lg" style={{width:896}}>
                <h1 className="text-4xl font-bold text-gray-700">{params.id?.toUpperCase()}</h1>
                { pokemonData &&
                <div className="mt-20 flex flex-wrap justify-around">
                    <img className="w-72" src={pokemonData.img? pokemonData.img : pokemonData.artwork} />
                </div>}
            </div>

        </div>
    )
}

export default SearchPage