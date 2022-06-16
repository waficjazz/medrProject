import React, { useState, useCallback, useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUpForm/SignUp";
import { ShowContext, RegContext } from "./context";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify({ uid: uid, token: token }));
    setShow(false);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    // setUserId(null);
    localStorage.removeItem("userData");
    setShow(true);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.uid, storedData.token);
      setShow(false);
    }
  }, [login]);
  return (
    <RegContext.Provider value={{ token: token, login: login, logout: logout }}>
      <ShowContext.Provider value={{ show, setShow }}>
        <BrowserRouter>
          {!isLoggedIn && <SignUp />}
          <Navbar />
          <MainPage />
        </BrowserRouter>
      </ShowContext.Provider>
    </RegContext.Provider>
  );
}

export default App;
