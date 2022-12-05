import React, { useEffect, useState } from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillMessage,
  AiFillGithub,
} from "react-icons/ai";
import michael from "../images/michael.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const getAuth = async () => {
      const response = await axios.get("http://localhost:3001/auth/auth", {
        header: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        window.localStorage.getItem("isLoggedIn");
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    };
    getAuth();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="container w-25 bg-white">
      <div className="row user-box">
        <div className="col-12">
          {!authState.status && (
            <h1 className="login text-black pb-3 pt-3 ms-4">
              Fullstack Project
            </h1>
          )}

          {!authState.status && (
            <h3 className="text-black text-center pt-2">Michael Yalovetzky</h3>
          )}
          {!authState.status && (
            <h4 className="text-black text-center">Web Developer</h4>
          )}
          {!authState.status && (
            <img
              className="bg-primary img-fluid rounded float-center mt-5 w-100"
              src={michael}
              alt="michael"
            />
          )}
          <div className="d-flex justify-content-center py-3 ">
            <a className="fs-1 me-3" href="https://twitter.com/mikeyalo">
              <AiFillTwitterCircle />
            </a>
            <a
              className="fs-1 me-3"
              href="https://www.linkedin.com/in/michael-yalovetzky/"
            >
              <AiFillLinkedin />
            </a>
            <a className="fs-1 me-3" href="https://github.com/yalomike">
              <AiFillGithub />
            </a>
            <a className="fs-1 me-3" href="mailto=myalo12@gmail.com">
              <AiFillMessage />
            </a>
          </div>
          <div className="welcome-text text-black ">
            {!authState.status && <h1>Welcome {authState.id}</h1>}
          </div>
          <Link to="/">
            <button className="logoutBtn btn btn-primary" onClick={logout}>
              Log out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
