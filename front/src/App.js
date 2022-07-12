import React, { useState, useCallback, useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUpForm/SignUp";
import { ShowContext, RegContext, LoadingContext } from "./context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
function App() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify({ uid: uid, token: token }));
    setShow(false);
  }, []);

  const highLogin = useCallback((uid, token) => {
    localStorage.setItem("high", JSON.stringify({ uid: uid, token: token }));
    // setIsLoggedIn(true);
    // setShow(false);
  }, []);

  const highLogout = useCallback(() => {
    // setUserId(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("high");
    setShow(true);
    setIsLoggedIn(false);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    // setUserId(null);
    localStorage.removeItem("userData");

    // localStorage.removeItem("high");
    setShow(true);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const highStoredData = JSON.parse(localStorage.getItem("high"));
    if (highStoredData && highStoredData.token) {
      highLogin(highStoredData.uid, highStoredData.token);
    }
    if (storedData && storedData.token) {
      login(storedData.uid, storedData.token);
      setShow(false);
      setIsLoggedIn(true);
    }
  }, [login]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <RegContext.Provider value={{ token: token, login: login, logout: logout, highLogin: highLogin, highLogout: highLogout }}>
        <ShowContext.Provider value={{ show, setShow }}>
          <BrowserRouter>
            {/* <Routes>
            <Route path="/s" element={<SignUp />} />
          </Routes> */}
            {isLoading && <Loading />}
            {!isLoggedIn && <SignUp />}
            <Navbar />
            {isLoggedIn && <MainPage />}
          </BrowserRouter>
        </ShowContext.Provider>
      </RegContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
