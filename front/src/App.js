import React, { useState, useCallback } from "react";
import MainPage from "./pages/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUpForm/SignUp";
import { ShowContext, regContext } from "./context";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setIsLoggedIn(true);
    // setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    // setUserId(null);
    localStorage.removeItem("userData");
  }, []);
  return (
    <regContext.Provider value={{ token: token, login: login, logout: logout }}>
      <ShowContext.Provider value={{ show, setShow }}>
        <BrowserRouter>
          <SignUp />
          <Navbar />
          <MainPage />
        </BrowserRouter>
      </ShowContext.Provider>
    </regContext.Provider>
  );
}

export default App;
