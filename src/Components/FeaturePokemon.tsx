// @ts-nocheck - may need to be at the start of file
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { allPokemonDataState, randomNumberState } from '../StateManagement/Atoms';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination ,Navigation } from "swiper";
import { useNavigate } from 'react-router-dom';

export function selectTypeColor(type: string){
    if(type === 'water')
        return 'bg-blue-600';
    else if(type === 'poison')
        return 'bg-purple-800'
    else if(type === 'bug')
        return 'bg-green-900'
    else if(type==='grass')
        return 'bg-green-500'
    else if(type==='normal')
        return 'bg-gray-500'
    else if(type ==='fighting')
        return 'bg-orange-500'
    else if(type ==='rock')
        return 'bg-slate-900'
    else if(type ==='ice')
        return 'bg-cyan-400'
    else if(type ==='ground')
        return 'bg-orange-900'
    else if(type ==='dragon')
        return 'bg-orange-300'
    else if(type ==='fairy')
        return 'bg-pink-400'
    else if(type ==='psychic')
        return 'bg-purple-400'
    else if(type ==='fire')
        return 'bg-red-600'
    else if(type==='flying')
        return 'bg-lime-300'
    else if(type==='electric')
        return 'bg-yellow-400'
    else if(type ==='ghost')
        return 'bg-slate-900'
    else if(type ==='steel')
        return 'bg-slate-500'
    else return 'bg-black'
}   


function FeaturePokemon() {
    const [indexRandom ,setIndexRandom] = useState<number[] | null>(null);
    const allPokemonData = useRecoilValue(allPokemonDataState);
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log(allPokemonData.length);
        if(indexRandom === null ){
            let tmpIndexArray = [] as number[];
            for(let i = 0 ; i < 10 ; i++){
                let num = Math.floor(Math.random() * ( 600 ))
                // console.log(tmp);
                tmpIndexArray.push(num);
                
            }
            setIndexRandom(tmpIndexArray)
        }
    },[])

    
    
    return (
        <div className="mt-10 max-w-4xl w-full flex flex-col shadow-lg shadow-slate-300 items-left rounded-xl z-0">
                <h2 className="text-xl font-bold text-gray-600 mt-5 ml-7 z-0" >Featured Pokémon</h2>
                <div className="w-full mt-7 flex items-center justify-center z-0">
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={false}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: -120,
                            stretch: 0,
                            depth: 110,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        navigation={true}
                        modules={[EffectCoverflow, Pagination ,Navigation]}
                        className="-z-10 mb-2"
                    >
                    {indexRandom &&
                        allPokemonData.map((pokemon , index)=>{
                            if(indexRandom.includes(index)){
                                return ( 
                                        <SwiperSlide key={index} className="z-0 flex flex-col items-center shadow-lg shadow-gray-400 rounded-lg cursor-pointer"
                                            onClick={()=>{ navigate(`/search/${pokemon.name}`) }}
                                        >
                                            <img src={pokemon.artwork} />
                                            <div className="flex flex-col items-center justify-center mb-8 w-full mt-7">
                                                <div className="flex justify-between items-center w-4/5">
                                                    <h2 className="text-lg md:text-xl font-extrabold text-gray-600">{pokemon.name}</h2>
                                                    <h3 className="text-lg md:text-xl font-extrabold text-gray-700">{pokemon.base_experience}</h3>

                                                </div>
                                                <div className="flex items-center justify-start mt-4 w-4/5">
                                                    <h3 className="text-base font-semibold">Type</h3>
                                                    <div className='flex flex-wrap items-center ml-7 justify-start'>
                                                        {pokemon.types.map((type,index)=>(
                                                            <p key={index} className={`mr-1 lg:mr-3 ${selectTypeColor(type)} px-2 rounded-xl text-white font-semibold`}>{type}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-start mt-2 w-4/5">
                                                    <h3 className="text-base font-semibold">Abilities</h3>
                                                    <div className='flex flex-wrap items-center ml-7 justify-start'>
                                                        {pokemon.abilities.map((ability,index)=>(
                                                            <p key={index} className="font-semibold tracking-wide">{index === pokemon.abilities.length -1 ? ability : `${ability},`}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                );
                            }
                        })}
                    </Swiper>
            
                </div>
        </div>
    )
            
}

export default FeaturePokemon