
import { useQuery,queryCache } from "react-query";

export const usePersonnelQuery = (func,onSuccess, onError) => {

    return useQuery('personnels', func,{onSuccess, onError})
}


export const usePersonnelQueryById = (id=null, func,onSuccess, onError) =>{

    return useQuery('personnel',func,{
      
        initialData:()=>{
                return queryCache.getQueryData("personnels")?.find(d => d.id === id)
        },
        initialStale: true,
        
        onSuccess, onError})

}


export const usePersonnelFilter = (text, func,onSuccess, onError) => {

    return useQuery('personnel',func,{
        enabled:false,
        initialData:()=>{
                return queryCache.getQueryData("personnels")?.filter(d => d.firstName.includes(text) || d.lastName.includes(text))
        },
        initialStale: true,
        
        onSuccess, onError})
}
