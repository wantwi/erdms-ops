import { Log, User, UserManager } from "oidc-client";





const {REACT_APP_LOGOUT_REDIRECT,REACT_APP_AUTHORITY,REACT_APP_CLIENT_ID,REACT_APP_CLIENT_ROOT,REACT_APP_CLIENT_SECRET,REACT_APP_RESPONSE_TYPE,REACT_APP_scope,REACT_APP_REDIRECT_URI, REACT_APP_SESSIONURL} = process.env

const sessionData = JSON.parse(sessionStorage.getItem(REACT_APP_SESSIONURL));

const config = {
  authority:REACT_APP_AUTHORITY,
  client_id:REACT_APP_CLIENT_ID,
  client_root:REACT_APP_CLIENT_ROOT,
  apiRoot: 'https://demo.identityserver.io/api/',
  redirect_uri: REACT_APP_REDIRECT_URI,
  post_logout_redirect_uri: REACT_APP_LOGOUT_REDIRECT,
  response_type: REACT_APP_RESPONSE_TYPE,
  client_secret:REACT_APP_CLIENT_SECRET,
  scope: REACT_APP_scope,
  pkce: true,
  monitorSession: false,
  response_mode: "query"
  
}

const userManager = new UserManager(config);
Log.logger = console;
Log.level = Log.INFO;

const getUser = async () => {
  return userManager.getUser();
};
const login = async () => {
  return userManager.signinRedirect();
};

const renewToken = async () => {
  return userManager.signinSilent();
};

const logout = async () => {
  return userManager.signoutRedirect();
};

export { getUser, login, renewToken, logout };

export const AuthActionsType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

const { LOGIN, LOGOUT } = AuthActionsType;


// const initialState = {
//   isLogin: localStorage.getItem("isLogin")
//     ? localStorage.getItem("isLogin") === "true"
//     : false,
//   accessToken: localStorage.getItem("access_token")
// };

const init = {
  isLogin: sessionData === null ? false : true,
  accessToken: sessionData?.access_token || null,
  session: sessionData,
};

export const AuthReducer = function(state = init, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,

        isLogin: true,
        accessToken: action.payload
      };
    }

    case LOGOUT: {
      return {
        isLogin: false,
        accessToken: null
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export const idpLogin = () => async dispatch => {
  console.log("login ....");
  login();
};

export const idpLogOut = () => async dispatch => {
  console.log("out ....");

  
  
  logout();
};

export const idpRenewToken= () => async dispatch => {
  console.log("renew ....");
  renewToken();
};

export const setUserInfo = token => async dispatch => {
  dispatch({
    type: LOGIN,
    payload: token
  });
};
