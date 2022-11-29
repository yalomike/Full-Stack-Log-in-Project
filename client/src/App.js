import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Registration from "../src/pages/Registration";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import UserProfile from "./pages/UserProfile";

function App() {
  const [loggedIn, setLoggedIn] = useState("");

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    window.localStorage.getItem("isLoggedIn");
    setLoggedIn(true);
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
    window.localStorage.removeItem("isLoggedIn");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="container w-50 position-absolute bg-white">
            <div className="text-center d-flex ">
              {!authState.status ? (
                <>
                  <Link className="text-primary h4" to="/login">
                    Log in
                  </Link>
                  <Link className="text-primary h4 ms-3" to="/registration">
                    Sign in
                  </Link>
                </>
              ) : (
                <Link to="/">
                  <button className="btn btn-primary ms-5" onClick={logout}>
                    Log out
                  </button>
                </Link>
              )}
              {authState.status && (
                <h1 className="text-primary mt-5">
                  Welcome <br /> {authState.username}
                </h1>
              )}
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
