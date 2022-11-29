import React, { useState, useEffect } from "react";
import background from "../images/1.jpg";

import axios from "axios";

function Home() {
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

  return (
    <div className="contenedor bg-primary img-fluid">
      <div className="col-12">
        <div className="row">
          <img
            className="bg-image d-flex w-100"
            src={background}
            alt="backgroundIMG"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
