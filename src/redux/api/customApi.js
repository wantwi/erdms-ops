import axios from 'axios';
let token =null,tokenType=""
const { REACT_APP_SERVICE_URL, REACT_APP_SESSIONURL } = process.env;

const session = sessionStorage.getItem(REACT_APP_SESSIONURL)

console.log({session});

if(session){

    const {access_token, token_type} =session
    tokenType = token_type
    token = access_token

}


export const customAxios = axios.create({
  baseUrl: REACT_APP_SERVICE_URL,
  headers: {
    'Authorization': `${tokenType} ${token}`
  }
});

customAxios.intercepotors.response.use(
  (response) => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/lms-operation-host/login';
    }
  });

export default customAxios;