import axios from "axios"

export const CustomAxios = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    withCredentials: true
})
