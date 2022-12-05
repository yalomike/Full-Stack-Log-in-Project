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
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
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
