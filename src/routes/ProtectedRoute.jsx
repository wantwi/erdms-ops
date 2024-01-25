import useAuth from "hooks/useAuth";
import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const {auth} = useAuth()
    
    return (
        <div>
            {auth?.accessToken ? (
                <Fragment>{children}</Fragment>
            ) : (
                <Redirect to={"/login"} />
            )}
        </div>
    );
};
