import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory, withRouter } from "react-router-dom";
import enhancer from "./enhancer/LoginFormEnhancer";
import Bg1 from "../../../assets/images/bg_1.jpg";
import { userLogin } from "config/config";



const Login = props => {
  const loginContainer = {
    backgroundImage: `url(${Bg1})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0
  };
const history = useHistory()



  const handleLogin = async () => {
    userLogin()
  };

  console.log({pathname: history.location.pathname})

  return (
    <div className="container-fluid" style={loginContainer}>
      <div
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "20%",
          fontSize: "70px"
        }}
      >
        <h1 className="text-white-100" style={{ fontSize: 50 }}>
          Logistics Management System
        </h1>
        <h2 className="text-white-80" style={{ fontSize: 38 }}>
       Operation
        </h2>
      </div>

      <button
        className="form-control btn-primary "
        style={{
          marginTop: "30px",
          height: "70px",
          width: 300,
          marginLeft: "auto",
          marginRight: "auto"
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default compose(withRouter, enhancer, connect(null))(Login);
