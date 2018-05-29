import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Header from "./shared/header";
import Footer from "./shared/footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Account from "./protected/account";
import Dashboard from "./protected/dashboard";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route{...rest} render={props =>
      authed === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
      )
    }/>
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route{...rest} render={props =>
      authed === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard"/>
      )
    }/>
  );
}


export default class App extends Component {
  state = {
    authed: false,
    loading: true
  };

  render() {
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <Header/> <Switch> <Route path='/' exact component={Home}/>
            <PublicRoute authed={this.state.authed} path='/login' component={Login}/>
            <PublicRoute authed={this.state.authed} path='/register' component={Register}/>
            <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard}/>
            <PrivateRoute authed={this.state.authed} path='/account' component={Account}/>
          </Switch> <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}
