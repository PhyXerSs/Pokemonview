import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { selectTypeColor } from '../Components/FeaturePokemon';
import { allPokemonDataState } from '../StateManagement/Atoms';
import { allPokemonData } from '../type/type';
import Pokeball from '../Asset/pokeball.gif'
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
            <div className="flex flex-col items-center justify-center shadow-lg shadow-slate-400 rounded-md relative bg-gradient-to-b from-white to-gray-100" style={{width:896}} >
                <h1 className="text-4xl font-bold text-gray-700 rounded-full absolute -top-7  py-2 px-6 shadow-lg shadow-gray-400 bg-gradient-to-b from-white to-gray-300">{params.id?.toUpperCase()}</h1>
                { pokemonData &&
                <div className="mt-20 flex flex-wrap justify-around w-full mb-12">
                    <div className="items-center justify-center flex rounded-2xl shadow-lg shadow-slate-600 bg-gradient-to-br from-stone-500 to-white">
                        <img className="w-80 p-8" src={pokemonData.artwork} />
                    </div>
                    
                    <div className="w-96 flex items-start justify-center  rounded-2xl shadow-lg shadow-slate-600 bg-gradient-to-br from-cyan-900 to-cyan-600 relative">
                        <div className='w-full flex flex-col justify-start items-center mt-10 ml-4'>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-white font-bold text-lg">Height</p>
                                <p className="text-white text-lg mt-3">{pokemonData.height}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-14">
                                <p className="text-white font-bold text-lg">Weight</p>
                                <p className="text-white text-lg mt-3">{pokemonData.weight}</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col  justify-start  mt-10">
                            <div className="flex flex-col items-start">
                                <p className="text-white font-bold text-lg">Abilities : </p>
                                {pokemonData.abilities.map((ability,index)=><p className="text-white text-lg" key={index}>{ability}</p>)}
                            </div>
                            <div className="flex flex-col items-start mt-3">
                                <p className="text-white font-bold text-lg">Types : </p>
                                {pokemonData.types.map((type,index)=><p className={`text-white text-lg px-2 rounded-md mt-1 shadow-lg shadow-slate-600 ${selectTypeColor(type)}`} key={index}>{type}</p>)}
                            </div>
                        </div>
                        <div className="absolute -bottom-12 w-28">
                            <img src={Pokeball}/>
                        </div>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default SearchPage