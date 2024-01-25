import axios from "axios"

const sessionData = JSON.parse(sessionStorage.getItem("oidc.user:https://demo.persol-apps.com/lms.auth:lms-operation-host_client"));

const {REACT_APP_SERVICE_URL} = process.env





export  const CustomAxios = axios.create({
    baseURL:REACT_APP_SERVICE_URL,
    headers:{
    
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData?.access_token || null}` 
    }
})

CustomAxios.interceptors.response.use(function (response) {
   
    return response;
}, function (error) {
    console.log({axiosErr: error});
    if (401 === error.response.status) {
        localStorage.removeItem("currentLocation")

        localStorage.setItem("currentLocation",window.location)

        // console.log({currentLocation:window.location})

        // alert(window.location)

        // return
        sessionStorage.clear()
        window.location = 'lms-operation-host/login';
    } else {
        return Promise.reject(error);
    }
});

