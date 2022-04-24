import {atom} from 'recoil'
import { getAllPokemonResponse } from '../type/type'
import { allPokemonData } from '../type/type';
export const themeState = atom({
    key : 'themeState',
    default : false as boolean,
})

export const searchState = atom({
    key : 'searchState',
    default: '' as string,
})


export const allPokemonDataState = atom({
    key : 'allPokemonName',
    default: null as allPokemonData[] | null  ,
    dangerouslyAllowMutability: true,
})

export const searchClickState = atom({
    key : 'searckClickState',
    default:false as boolean,
})

export const randomNumberState = atom({
    key: 'randomNumberState',
    default: [] as number[]
})