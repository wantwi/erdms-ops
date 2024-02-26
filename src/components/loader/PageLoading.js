import React from "react";
import LOGO from "../../assets/images/logo.png";
const PageLoading = () => {
  return (
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
      <img src={LOGO} width={200} alt="Logo" />
      <p>Please wait...</p>
    </div>
  );
};

export default PageLoading;
