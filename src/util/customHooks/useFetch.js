import {useEffect, useState} from "react"

import { CustomAxios } from "util/customAxios";


const useFetch =  (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect( () => {

    setIsLoading(true)

    CustomAxios.get(`${url}`).then(response =>{
      setData(response.data);
    }).catch(err =>{
      setError(err);
    }).finally(()=>{
      setIsLoading(false)
    })

   
  }, [])
  

 

  return { data, isLoading, error };
};

export default useFetch;
