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
    <div className="contenedor">
      <div className="col-12">
        <img
          className="bg-image d-flex w-100"
          src={background}
          alt="backgroundIMG"
        />

        <h3 className="text-white mt-5 pt-5 text-center ">
          This App was created by: <br /> Michael Yalovetzky <br /> Through many
          different courses and projects i've learnt to work mixing <br />
          Front End Development and Back End. <br /> Full Stack project using:{" "}
          <br />
          JavaScript / React / Node.js / Bootstrap / MySQLWorkbench / Postman /
          VSCode
        </h3>
      </div>
    </div>
  );
}

export default Home;
