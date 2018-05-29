import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App, { PublicRoute, PrivateRoute } from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";
import Account from "./components/protected/account";
import Dashboard from "./components/protected/dashboard";
import Login from "./components/login";
import Register from "./components/register";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <PublicRoute authed={true} path="/login" component={Login} />
        <PublicRoute authed={true} path="/register" component={Register} />
        <PrivateRoute authed={true} path="/dashboard" component={Dashboard} />
        <PrivateRoute authed={true} path="/account" component={Account} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
