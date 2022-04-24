import React from 'react'
import axios from 'axios';

import { getAllPokemonResponse, getOnePokemonResponse } from '../type/type';


export const getAllPokemon= async() =>{
    let res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000");
    // console.log(res.data);
    
    return res as getAllPokemonResponse;
    
    
}

export const getOnePokemon = async(url : string)=>{
    return await axios.get(url) as getOnePokemonResponse;
}


export const getOnePokemonByNumber = async(index : number)=>{
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`) as getOnePokemonResponse;
}
