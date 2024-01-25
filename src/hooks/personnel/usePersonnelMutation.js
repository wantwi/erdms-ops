import {useMutation} from "react-query"

    

    export const  usePersonnelPost = (func, onSuccess) => {
      
        return useMutation(func,{
            onSuccess
        })
    }

    export const  usePersonnelPut = (func, onSuccess) => {
      
        return useMutation(func,{
            onSuccess
        })
    }
    export const  usePersonnelDelete = (func, onSuccess) => {
      
        return useMutation(func,{
            onSuccess
        })
    }


    
