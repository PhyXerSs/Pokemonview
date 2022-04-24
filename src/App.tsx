import React , {useEffect} from 'react';
import { useRecoilValue , useRecoilState } from 'recoil'
import Navbar from './Components/Navbar';
import { Routes, Route} from "react-router-dom";
import FirstPage from './Pages/FirstPage';
import SearchPage from './Pages/SearchPage';
import { CheckAllPokemonData } from './StateManagement/Selector'
import { allPokemonDataState, searchState } from './StateManagement/Atoms';
import { allPokemonData } from './type/type';
import { getAllPokemon, getOnePokemon } from './api/PokeAPI';
import pokeballGif from './Asset/pokeball.gif'
function App() {
  const checkDataIsLoad = useRecoilValue(CheckAllPokemonData);
  const [ , setAllData  ] = useRecoilState(allPokemonDataState);
  useEffect(()=>{
        
    (async function(){
         let tmp = [] as allPokemonData[];
         let res = await getAllPokemon();
         
         let resEachPokemon =await Promise.all(res.data?.results.map((pokemon)=>getOnePokemon(pokemon.url)));
         resEachPokemon.forEach((resultsGetOne)=>{
             let pokeObj = {} as allPokemonData ;
             pokeObj.name = resultsGetOne.data?.name;
             pokeObj.base_experience = resultsGetOne.data?.base_experience;
             pokeObj.img = resultsGetOne.data?.sprites.other.dream_world.front_default;
             pokeObj.height = resultsGetOne.data?.height;
             pokeObj.weight = resultsGetOne.data?.weight;
             pokeObj.artwork = resultsGetOne.data?.sprites.other['official-artwork'].front_default;
             pokeObj.types = [];
             resultsGetOne.data?.types.forEach((t)=>{
                 pokeObj.types.push(t.type.name);
             })
             pokeObj.abilities = [];
             resultsGetOne.data?.abilities.forEach((a)=>{
                 pokeObj.abilities.push(a.ability.name);
             })
             
             tmp.push(pokeObj)
         })
         
        
     setAllData(tmp);

     } ());
 },[])

    if(!checkDataIsLoad ){
      return <div className="w-full h-screen flex items-center justify-center"><img src={pokeballGif}/></div>
    }
    else{
    return (
      <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<FirstPage/>}/>
          <Route path='/search/:id' element={<SearchPage/>} />
        </Routes>
      </>
    );
    }
  
}

export default App;
