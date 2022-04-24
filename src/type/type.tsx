export interface getAllPokemonResponse{
    data:{
        count: number;
        results: [{
            name:string,
            url: string
        }];
    }
}

export interface getOnePokemonResponse{
    data:{
        height:number,
        name:string,
        base_experience:number,
        sprites:{
            other:{
                dream_world:{
                    front_default: string,
                }
                "official-artwork":{
                    front_default:string
                }
            }
        },
        stats:[{
            base_stat:number,
            stat:{
                name:string,
            }
        }],
        weight:number,
        types:[
            {
                type:{
                    name:string
                }
            }
        ],
        abilities:[
            {
                ability:{
                    name:string
                }
            }
        ]
    }
}

export interface allPokemonData{
    name:string,
    img:string | undefined,
    base_experience:number,
    height:number,
    weight:number,
    types:string[],
    abilities:string[], 
    artwork:string,
}