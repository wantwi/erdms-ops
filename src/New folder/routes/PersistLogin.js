import { renewToken, userLogout } from "config/config";
import useAuth from "hooks/useAuth";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { hideLoader, showLoader } from "redux/loader/Loader";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import useRefreshtoken from "../hooks/useRefreshtoken";


const menus = [
  // "report",
  // "review-requirment",
  "update-activity",
  // "assign-activity",
  // "new-job",
  // "customer-registration",
   "home",
  // "personnel",
  // "equipment",
  // "equipment-type",
  // "roles",
  // "document-setup",
  // "regulatory-setup",
  // "requirement-setup",
  // "service-activity",
  // "service-type", 
  // "customer-registration",
];

const PersistLogin = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


   const path = history.location.pathname.replace("/",'')

  const { auth, setAuth } = useAuth();

  const getNewToken = () => {
    dispatch(showLoader());
    renewToken()
      .then((response) => {
        const { access_token, profile } = response;
        const { family_name, given_name } = profile;

        setAuth({ given_name, family_name, accessToken: access_token });
        dispatch(hideLoader());
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(hideLoader());
        setIsLoading(false);
         setAuth(null);
        // localStorage.setItem("persist", false);
       
      
      });
  };

  // useLayoutEffect(() => {

  //   if(!localStorage.getItem("persist") || localStorage.getItem("persist") == false){
  //     history.push("/login")
  //   }
  // }, [])

  useEffect(() => {
    console.log({currentPath: path})

    

    if (menus.includes(path.toLocaleLowerCase())) {
      auth?.accessToken ? setIsLoading(false) : getNewToken();
    } else {
      history.push("/error400");
    }
  }, []);




  useEffect(() => {
     //console.log(`isLoading: ${isLoading}`);
    //  console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading]);

  return <> {isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
