import React, { useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";
import * as Oidc from "oidc-client";
import { useDispatch } from "react-redux";

import useAuth from "hooks/useAuth";

import LOGOG from "../../../assets/images/logo.png";

import { setResponse } from "redux/loader/Loader";
import { signinCallback } from "config/config";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const mgr = new Oidc.UserManager({ response_mode: "query" });

const SigninCallback = props => {
  const { auth, setAuth } = useAuth();
  const dispatch = useDispatch();
  const curentUser = async () => {
    try {
      const response = await signinCallback();

      if (response) {
        const { access_token, profile } = response;
        const { family_name, given_name } = profile;

        setAuth({ given_name, family_name, accessToken: access_token });
      }

      console.log({ curentUser: response });
    } catch (error) {
      console.log({ signinCallback: error });
      dispatch(setResponse(error?.Error?.message, false));
      dispatch(setResponse("", true));
    }
    // mgr
    //   .signinRedirectCallback()
    //   .then(response => {

    // if (response) {
    //   const { access_token, profile } = response;
    //   const { family_name, given_name } = profile;

    //   setTimeout(() => {
    //     setAuth({ given_name, family_name, accessToken: access_token });
    //   }, 5000);
    // }

    //     return;
    //   })
    //   .catch(err => {
    //      console.log({err})
    //     //dispatch(setResponse("Something went wrong", false));
    //     dispatch(setResponse("", true));
    //    //localStorage.setItem("persist_admin", false);
    //     //localStorage.removeItem("persist_admin");
    //     //userLogout()
    //   });
  };

  useLayoutEffect(() => {
    curentUser();
  }, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f1f2f3"
        }}
      >
        <img src={LOGOG} width={250} alt="persol" />
        <h4>Please wait ...</h4>
        <p>Redirecting you to your home page.</p>
      </div>
      {auth?.accessToken ? <Redirect to={`/home`} /> : null}
    </div>
  );
};

// export default compose(withRouter, connect(null))(SigninCallback);

export default SigninCallback;
