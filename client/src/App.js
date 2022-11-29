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
  const [changeLogin, setChangeLogin] = useState(false);

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
          <div className="container w-50 position-absolute bg-white text-center">
            <div className="boxLogin text-center d-flex ">
              {!authState.status ? (
                <>
                  <Link
                    onClick={() => {
                      setChangeLogin(false);
                    }}
                    className="loginText text-primary h4"
                    to="/"
                  >
                    Log in
                  </Link>
                  <Link
                    onClick={() => {
                      setChangeLogin(true);
                    }}
                    className="signinText text-primary h4 ms-3"
                    to="/"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <Link to="/">
                  <button
                    className="logoutText btn btn-primary ms-5"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </Link>
              )}
              {authState.status && (
                <h1 className="welcome-text text-primary mt-5">
                  Welcome <br /> {authState.username}
                </h1>
              )}
            </div>
            {!changeLogin ? <Login /> : <Registration />}
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
