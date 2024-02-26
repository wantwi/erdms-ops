import React, { useEffect, useLayoutEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import * as Oidc from "oidc-client";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import useAuth from "hooks/useAuth";
import RD from "./assets/gif/rd.gif";
import { userLogout } from "config/config";
import { setResponse } from "redux/loader/Loader";
import jwt from "jsonwebtoken";

const mgr = new Oidc.UserManager({ response_mode: "query" });

const SigninCallback = props => {
  const { auth, setAuth } = useAuth();
  const dispatch = useDispatch();
  const curentUser = () => {
    mgr
      .signinRedirectCallback()
      .then(response => {
        localStorage.setItem("persist", true);
        const token = jwt.decode(response?.access_token);

        if (response) {
          const { access_token, profile } = response;
          const { family_name, given_name } = profile;

          setTimeout(() => {
            setAuth({ given_name, family_name, accessToken: access_token });
          }, 5000);
        }

        // console.log({token})
        // if(token?.client_id !=="lms-operation-host_client-live"){
        //   userLogout()
        // }else{
        //   if (response) {
        //     const {access_token, profile} = response
        //     const {family_name,given_name} = profile

        //     setTimeout(() => {
        //       setAuth({ given_name, family_name,  accessToken:access_token })
        //     },5000)
        //   }
        // }
      })
      .catch(err => {
        dispatch(setResponse("Something went wrong", false));
        dispatch(setResponse("", true));
        //localStorage.setItem("persist",false)
        userLogout();
      });
  };

  useLayoutEffect(() => {
    curentUser();
  }, []);

  //client_id
  useEffect(() => {
    // localStorage.setItem("persist", true);
  }, []);

  return (
    <div>
      <h1>Please wait ...</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img src={RD} alt="persol" />
      </div>
      {auth?.accessToken ? <Redirect to="/home" /> : null}
    </div>
  );
};

export default compose(withRouter, connect(null))(SigninCallback);

//       let data = {
//         token: user.access_token,
//       };
//       testState = true;

//      props.login(data)

// console.log({user})
// console.log({mgr})
// console.log({res})

//       const users = await getUser()

//       console.log({users})

//       return

//       if(user){
//         let data = {
//           token: user.access_token,
//         };

//         if(data.token){
//           dispatch(login(data));

//         }
//      }
