import React, { useEffect } from 'react'
import {useRecoilState} from 'recoil'
import { searchState } from '../StateManagement/Atoms'

import FeaturePokemon from '../Components/FeaturePokemon'

function FirstPage() {
    const [ , setSearch ] = useRecoilState(searchState);  
    useEffect(()=>{
        setSearch('');
    },[])

     return (
            
        <div className="mt-20 w-full flex flex-col  justify-center items-center">
            <FeaturePokemon />
        </div>
    )
    
}

export default FirstPage