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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = () => {
    let details = new FormData();
    details.set("user[email]", email);
    details.set("user[password]", password);
    details.set("user[first_name]", firstName);
    details.set("user[last_name]", lastName);
    details.set("user[phone]", phone);
    details.set("device_detail[device_type]", "web");
    details.set("device_detail[player_id]", "12345");

    axios({
      url: "http://alldaydr.herokuapp.com/api/users/sign_up.json",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: details,
    }).then((response) => {
      if (response.success) {
        context.setUserDetails({
          isAuthenticated: true,
          authToken: response.data.user.auth_token,
        });
      } else {
        setErrorState({ error: true, message: response.data.message });
      }
    });
  };

  return context.user.isAuthenticated ? <Redirect to="/Product"/> : (
    <div style={{ paddingTop: 100 }} className="container col-lg-4">
      <div className="row">
        <label className="form-gruop">Register</label>
      </div>
      {errorState.error ? (
        <div className="row">
          <label className="form-group">{errorState.message}</label>
        </div>
      ) : null}
      <div className="row">
        <form
          id="registerForm"
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            className="form-group form-control"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-group form-control"
            required
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="form-group form-control"
            required
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
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
          <button className="btn btn-primary">Register Now</button>
        </form>
      </div>
      <div className="row">
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
};
