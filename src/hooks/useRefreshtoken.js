import { renewToken } from "../config/config"
import useAuth from "./useAuth"



const useRefreshtoken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
     

            const newToken = await renewToken()

            const { access_token, profile } = newToken;
            const { family_name, given_name } = profile;
    
            
            if (newToken) {
                const {access_token} = newToken
               

                setAuth((prev) => ({...prev,  accessToken: access_token }))

                return access_token
                
            }
      
    }

    return refresh
}

export default useRefreshtoken 