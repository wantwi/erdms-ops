
import { useMutation } from "react-query";


export const  usePost = (func, onSuccess,  onError = ()=>{}) => {
      
    return useMutation(func,{
        onSuccess,
        onError
    })
}

export const  usePut = (func, onSuccess,  onError = ()=>{}) => {
  
    return useMutation(func,{
        onSuccess,
        onError
    })
}
export const  useDelete = (func, onSuccess,  onError = ()=>{}) => {
  
    return useMutation(func,{
        onSuccess,
        onError
    })
}



