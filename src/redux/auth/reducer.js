import authAction from "./actions";

const { REACT_APP_SESSIONURL } = process.env;

const sessionData = JSON.parse(sessionStorage.getItem(REACT_APP_SESSIONURL));


// const {access_token} = sessionData

// const initState = {
//     isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') === 'true' : false,
//     accessToken: localStorage.getItem('access_token')
// }

const init = {
  isLogin: sessionData === null ? false : true,
  accessToken: sessionData?.access_token || null,
  session: sessionData,
};

export default function rootReducer(state = init, action) {
  switch (action.type) {
    case authAction.LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
      };
    case authAction.LOGOUT:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: null,
      };
    default:
      return state;
  }
}
