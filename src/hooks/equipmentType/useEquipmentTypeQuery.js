
import { useQuery,useMutation } from "react-query";

export const useEquipmentTypeQuery = (func,onSuccess, onError=()=>{}) => {

    return useQuery('equipment-type', func,{onSuccess, onError})
}

export const  usePost = (func, onSuccess,onError=()=>{}) => {
      
    return useMutation(func,{
        onSuccess,
        onError
    })
}

export const  usePut = (func, onSuccess,onError=()=>{}) => {
  
    return useMutation(func,{
        onSuccess,
        onError
    })
}
export const  useDelete = (func, onSuccess, onError=()=>{}) => {
  
    return useMutation(func,{
        onSuccess,
        onError
    })
}



