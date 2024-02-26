import React from "react";
import ReactDOM from "react-dom";
import "./views/reports/globals";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
//import reportWebVitals from "reportWebVitals";

import { registerLicense } from "@syncfusion/ej2-base";
import { AuthProvider } from "context/AuthProvider";

import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkFjXH9XdHBRQGRVUkM="
);

const queryClient = new QueryClient();

ReactDOM.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </AuthProvider>,
  document.getElementById("root")
);
alert = () => {};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//reportWebVitals()
window.alert = () => {};
console.log = console.warn = console.error = () => {};
