import React, { useContext } from "react";
import dataContext from "../Context/dataContext";
import axios from "axios";
import {Link,Redirect} from "react-router-dom";

export default () => {
  const context = useContext(dataContext);
  const signOut = () => {
    axios({
      method: "delete",
      url: "http://alldaydr.herokuapp.com/api/users/sign_out.json",
      headers: {
        "Content-Type": "multipart/form-data",
        "Auth-Token": context.user.authToken,
      },
    }).then(function (response) {
      if (response.data.success) {
        context.setUserDetails({
          isAuthenticated: false,
          authToken: ""
        });
      } else {
        alert(response.data.message);
      }
    });
  };
  return (
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
          <span className="navbar-brand">Shop</span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {context.user.isAuthenticated ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <span className="nav-link">
                    <Link to="/Product">Product</Link>
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <Link to="/Cart">Cart</Link>
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link btn btn-link"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </span>
                </li>
              </ul>
            ) : <Redirect to="/Login"/>}
          </div>
        </nav>
      </div>
  );
};
