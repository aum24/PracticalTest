import React, { useContext, useState } from "react";
import dataContext from "../Context/dataContext";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default () => {
  const context = useContext(dataContext);
  const [errorState, setErrorState] = useState({
    error: false,
    message: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    let details = new FormData();
    details.set("user[email]", email);
    details.set("user[password]", password);
    details.set("device_detail[device_type]", "web");
    details.set("device_detail[player_id]", "12345");
    
    axios({
      method: "post",
      url: "http://alldaydr.herokuapp.com/api/users/sign_in.json",
      data: details,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      if (response.data.success) {
        context.setUserDetails({
          isAuthenticated: true,
          authToken: response.data.data.user.auth_token
        });
      } else {
        setErrorState({ error: true, message: response.data.message });
      }
    });
  };
  return context.user.isAuthenticated ? <Redirect to="/Product"/> : (
      <div style={{ paddingTop: 100 }} className="container col-lg-4">
        <div className="row">
          <label>Sign in</label>
        </div>
        {errorState.error ? (
          <div className="row">
            <label style={{ marginTop: 10, marginBottom: 10 }}>
              {errorState.message}
            </label>
          </div>
        ) : null}
        <div className="row">
          <form
            id="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              className="form-group form-control"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-group form-control"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button className="btn btn-primary">Sign in</button>
          </form>
        </div>
        <div className="row">
          <Link to="/Register">Register</Link>
        </div>
      </div>
  );
};
