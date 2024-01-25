import useCustomApi from "api/useCustomApi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader, setResponse } from "redux/loader/Loader";

export const useGet = (key, url, search = "") => {
    const customApi = useCustomApi()
    const dispatch = useDispatch();
    // dispatch(showLoader())
    const getFunction = async () => {
      if (!!search) {
        url += `&filter=${search}`
      }
      const response = await customApi.get(url)
      if(response){
        // dispatch(hideLoader())
      }
      console.log({ response })
      return response?.data?.items ||response?.data || []
    }
  
    return useQuery(
      [key, { search }],
      getFunction,
      {
        onSuccess: () => {
            // dispatch(hideLoader())
        },
        onError: (error) => {
            // dispatch(hideLoader())
            console.log({error})
        },
        // refetchOnMount: false
      })
}

export const useGetById = (key,id="",func,onSuccess, onError) => {

    return useQuery(
        [key,{id}], 
        func,
        {
            enabled:false,
            onSuccess, 
            onError
        })
}

export const useGetStatic = (key,func,onSuccess, onError) => {

    return useQuery(
        
        [key], 
        func,
        {onSuccess,
             onError,
             refetchOnWindowFocus: false

            })
}




   