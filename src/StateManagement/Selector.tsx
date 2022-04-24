import { useEffect, useState } from 'react';
import {selector, waitForAll, waitForNone} from 'recoil';
import { SwiperSlide } from 'swiper/react';
import { getOnePokemon } from '../api/PokeAPI';
import { allPokemonData } from '../type/type';
import { allPokemonDataState, randomNumberState, searchState } from './Atoms';

export const AllPokemonNameSelected = selector({
    key: "AllPokemonNameSelected",
    get: ({get}) => {
        let allData = get(allPokemonDataState);  
        let keyWord = get(searchState);
        
        
        return allData?.filter((pokemon)=>pokemon.name?.includes(keyWord));
    }
})

export const CheckAllPokemonData = selector({
    key : "CheckAllPokemonData",
    get: ({get}) => {
        let allData = get(allPokemonDataState);
        // console.log(allData);
        
        if(allData)
            return true ;
        else{
            return false; 
             
        }
    },
    
})

export const randomPokemonSelected = selector({
    key: "RandomPokemonSelected",
    get : ({get})=>{
        let allData = get(allPokemonDataState);
        let randomArray = get(randomNumberState);
        
        return allData?.filter((pokemon , index)=> randomArray.includes(index));
        
    }
})


