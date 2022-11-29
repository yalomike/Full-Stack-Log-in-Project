import React, { useState, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillMessage,
  AiFillGithub,
} from "react-icons/ai";
import michael from "../images/michael.jpeg";

function UserProfile() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  //

  return (
    <div>
      {!authState.status && (
        <h1 className="login text-white pb-3 pt-3">Fullstack Project</h1>
      )}

      {!authState.status && (
        <h3 className="text-white text-center pt-2">Michael Yalovetzky</h3>
      )}
      {!authState.status && (
        <h4 className="text-white text-center">Web Developer</h4>
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
    </div>
  );
}

export default UserProfile;
