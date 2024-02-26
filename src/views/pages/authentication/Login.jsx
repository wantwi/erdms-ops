import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory, withRouter } from "react-router-dom";
import enhancer from "./enhancer/LoginFormEnhancer";
import Bg1 from "../../../assets/images/logo.png";
import { userLogin } from "config/config";
import { Button, CardText, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Login = props => {
  const loginContainer = {
    backgroundImage: `url(${Bg1})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
    display: "none"
  };
  const history = useHistory();

  const handleLogin = async () => {
    userLogin();
  };
  useLayoutEffect(() => {
    userLogin();
    return () => {};
  }, []);

  return (
    <>
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
            style={{ height: "100vh" }}
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="" src={Bg1} />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                Welcome to ERDMS Operation! 👋
              </CardTitle>
              <CardText className="mb-2">
                Please sign-in to your account
              </CardText>

              <Button type="button" color="primary" block onClick={handleLogin}>
                Sign in
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
      <div className="container-fluid" style={loginContainer}>
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20%",
            fontSize: "70px"
          }}
        >
          <h1 className="text-white-100" style={{ fontSize: 55 }}>
            Logistics Management System
          </h1>
          <h2 className="text-white-80" style={{ fontSize: 38 }}>
            Logistics Admin
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
    </>
  );
};

export default compose(withRouter, enhancer, connect(null))(Login);

// import React from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { withRouter } from "react-router-dom";
// import enhancer from "./enhancer/LoginFormEnhancer";
// import Bg1 from "../../../assets/images/bg_1.png";
// import { userLogin } from "config/config";

// const Login = props => {
//   const loginContainer = {
//     backgroundImage: `url(${Bg1})`,
//     backgroundPosition: "center center",
//     backgroundSize: "cover",
//     position: "fixed",
//     overflow: "auto",
//     top: 0,
//     bottom: 0
//   };

//   const handleLogin = async () => {
//     userLogin()
//   };

//   return (
//     <div className="container-fluid" style={loginContainer}>
//       <div
//         style={{
//           textAlign: "center",
//           color: "white",
//           marginTop: "20%",
//           fontSize: "70px"
//         }}
//       >
//         <h1 className="text-white-100" style={{ fontSize: 50 }}>
//           Logistics Management System
//         </h1>
//       </div>

//       <button
//         className="form-control btn-primary "
//         style={{
//           marginTop: "30px",
//           height: "70px",
//           width: 300,
//           marginLeft: "auto",
//           marginRight: "auto"
//         }}
//         onClick={handleLogin}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default compose(withRouter, enhancer, connect(null))(Login);
