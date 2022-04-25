import React, { useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import logo1 from '../Asset/logo1.png'
import logo2 from '../Asset/logo2.png'
import { useRecoilState ,useRecoilValue } from 'recoil'
import { searchClickState, searchState, themeState } from '../StateManagement/Atoms'
import { AllPokemonNameSelected } from '../StateManagement/Selector'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {

    const [ darkMode , setDarkMode ] = useRecoilState<boolean>(themeState);
    const [ search , setSearch ] = useRecoilState<string>(searchState);
    const [ searchClick , setSearchClick] = useRecoilState<boolean>(searchClickState);
    const nameRelevant = useRecoilValue(AllPokemonNameSelected);
    const navigate = useNavigate();
    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
        setSearchClick(true);
    }

    function handleSearch(keyword : string){
        setSearchClick(false);
        if(keyword === '' )
            navigate('/');
        else{
            navigate(`/search/${keyword}`);
        }
    }
    // console.log(nameRelevant);
    
    return (
        <nav className={`w-full  h-20 ${darkMode ? 'bg-gray-700' : 'bg-white'} border-b-2 border-blue-400 flex items-center justify-center fixed top-0 ease-in-out duration-500 z-50`}
            
        >
            <div className="max-w-4xl w-full flex items-center justify-between">
                <div className="flex items-center justify-between w-24 gap-2 ml-6 cursor-pointer"
                    onClick={()=>{handleSearch('');}}
                >
                    <img className="h-12" src={logo1}/>
                    <img src={logo2}/>
                </div>
                <div className="flex flex-col items-left w-80">
                    <div className="shadow-lg w-full flex items-center justify-between bg-slate-200 rounded-3xl overflow-auto">
                        <input type="text" className="outline-none w-4/5 bg-transparent ml-5 font-bold" placeholder="search here..." value={search} 
                            onChange={(event)=>handleInputChange(event)}
                            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=>{
                                if(e.key==='Enter')
                                    handleSearch(search);
                            }}
                        />
                        <div className="w-1/5 p-2 bg-blue-500 hover:bg-sky-700 flex items-center justify-center cursor-pointer ease-in-out duration-300 z-10"
                            onClick={()=>handleSearch(search)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-cyan-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                    </div>
                    <ul className={`w-64 ${search !== '' && searchClick ?'max-h-96' : 'max-h-0'} flex flex-col items-center bg-white fixed top-16 shadow-lg shadow-gray-300 overflow-y-scroll rounded-md`}>
                        {nameRelevant?.map((pokemon,index:number)=>(
                                <div className="w-full hover:bg-slate-200" key={index} >
                                    
                                    <li className="pt-3 pb-1 ml-3 w-11/12 border-b-2 border-gray-200 flex items-center cursor-pointer" 
                                        onClick={()=>{setSearch(pokemon.name);handleSearch(pokemon.name)}}
                                    >
                                        <img className="w-8" src={pokemon.img ? pokemon.img : pokemon.artwork}/>
                                        <p className="text-lg ml-5">{pokemon.name}</p>
                                    </li>
                                </div>
                        ))}
                    </ul>
                </div>
                
                <div className={`shadow-md  ${darkMode ? '' : 'shadow-gray-400'} flex items-center w-14 h-6 mr-6 ${darkMode ?'bg-gray-600' : 'bg-blue-500'  } rounded-xl cursor-pointer ease-in duration-300 relative`} 
                    onClick={()=>setDarkMode(!darkMode)}
                >
                    { !darkMode  &&
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>}
                    {darkMode  &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-1 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>}
                    <div className={`bg-white  w-5 h-5 rounded-xl m-0.5 ease-in duration-300 absolute top-0 bottom-0 ${darkMode ? 'right-0' : 'right-8'} shadow-inner shadow-gray-400 hover:shadow-white`}></div>
                </div>
            </div>
        </nav>
    )
}