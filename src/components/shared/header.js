import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/meeter-logo.png";
import ExploreIcon from "../../assets/icons/explore.svg";
import AccountIcon from "../../assets/icons/account.svg";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-section">
        <div className="container">
          {/*<div className="row">*/}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link className="navbar-brand col-4 offset-4" to="/">
              <img className="d-flex mx-auto logo" src={logo} alt=""/> </Link>
            <div className="collapse navbar-collapse col-4 justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/"> <img src={ExploreIcon} alt="explore"/> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account"> <img src={AccountIcon} alt="account"/> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Logowanie</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Rejestracja</Link>
                </li>
              </ul>
            </div>
          </nav>
          {/*</div>*/}
        </div>
      </header>
    );
  }
}
