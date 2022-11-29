import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        window.localStorage.setItem("isLoggedIn", true);
        navigate("/userprofile");
      }
    });
  };

  return (
    <div className="container pt-5 text-center">
      <div>
        <label className="text-white ps-5">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label className="text-white ps-5">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="justify-content-center d-flex mt-4">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
        </div>
      </div>
      <hr />
      <Link className="pt-3 text-primary h4" to="/">
        Back
      </Link>
    </div>
  );
}

export default Login;
