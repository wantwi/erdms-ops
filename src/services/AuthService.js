import { Log, User, UserManager } from "oidc-client";

const config = {
  // the URL of our identity server
  authority:'https://demo.persol-apps.com/lms.auth',
  // this ID maps to the client ID in the identity client configuration
  client_id:'lms-operation-host-persol-test_client',
  client_root: 'https://localhost:8520',
  apiRoot: 'https://demo.identityserver.io/api/',
  // URL to redirect to after login
  //redirect_uri: REACT_APP_REDIRECT_URI_PSL,
  redirect_uri: 'https://localhost:8520/lms-operation-host/signin-oidc.html', //process.env.REACT_APP_redirect_uri,
  // URL to redirect to after logout
  post_logout_redirect_uri: 'http://psl-webapps/npa-invoice-creator/silent-renew.html',
  //post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_,
  response_type: 'code',
  client_secret:"98dab450-6d84-4508-d9f8-79aa3950fedb",
  // the scopes or resources we would like access to
  scope: 'openid profile modularapi',
  pkce: true,
  monitorSession: false,
}

// const config = {
//   // the URL of our identity server
//   authority:'https://demo.persol-apps.com/lms.auth',
//   // this ID maps to the client ID in the identity client configuration
//   client_id:'lms-operation-host-persol-test_client',
//   client_root: 'https://demo.persol-apps.com/lms-operation-host',
//   apiRoot: 'https://demo.identityserver.io/api/',
//   // URL to redirect to after login
//   //redirect_uri: REACT_APP_REDIRECT_URI_PSL,
//   redirect_uri: 'https://demo.persol-apps.com/lms-operation-host/signin-oidc.html', //process.env.REACT_APP_redirect_uri,
//   // URL to redirect to after logout
//   post_logout_redirect_uri: 'http://psl-webapps/npa-invoice-creator/silent-renew.html',
//   //post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_,
//   response_type: 'code',
//   client_secret:"98dab450-6d84-4508-d9f8-79aa3950fedb",
//   // the scopes or resources we would like access to
//   scope: 'openid profile modularapi',
//   pkce: true,
//   monitorSession: false,
// }

// const config = {
//   // the URL of our identity server
//   authority: "https://demo.persol-apps.com/lms.auth",
//   // this ID maps to the client ID in the identity client configuration
//   client_id: "lms-operation-host_client",
//   client_root: "https://demo.persol-apps.com/lms-operation-host",
//   apiRoot: "https://demo.identityserver.io/api/",
//   // URL to redirect to after login
//   //redirect_uri: REACT_APP_REDIRECT_URI_PSL,
//   redirect_uri:
//     "https://demo.persol-apps.com/lms-operation-host/signin-callback", //process.env.REACT_APP_redirect_uri,
//   // URL to redirect to after logout
//   post_logout_redirect_uri:
//     "http://psl-webapps/npa-invoice-creator/silent-renew.html",
//   //post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_,
//   response_type: "code",
//   client_secret: "98dab450-6d84-4508-d9f8-79aa3950fedb",
//   // the scopes or resources we would like access to
//   scope: "openid profile modularapi",
//   pkce: true,
//   monitorSession: false
// };

// const config = {
//   // the URL of our identity server
//   authority:'https://demo.persol-apps.com/lms.auth',
//   // this ID maps to the client ID in the identity client configuration
//   client_id:'lms-operation-host_client',
//   client_root: 'https://psl-webapps/lms-operation-host',
//   apiRoot: 'https://demo.identityserver.io/api/',
//   // URL to redirect to after login
//   //redirect_uri: REACT_APP_REDIRECT_URI_PSL,
//   redirect_uri: 'https://psl-webapps/lms-operation-host/signin-callback', //process.env.REACT_APP_redirect_uri,
//   // URL to redirect to after logout
//   post_logout_redirect_uri: 'http://psl-webapps/npa-invoice-creator/silent-renew.html',
//   //post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_,
//   response_type: 'code',
//   client_secret:"98dab450-6d84-4508-d9f8-79aa3950fedb",
//   // the scopes or resources we would like access to
//   scope: 'openid profile modularapi',
//   pkce: true,
//   monitorSession: false,
// }

console.log({ config });

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
