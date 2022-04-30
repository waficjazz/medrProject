import React from "react";
import SignUp from "../../components/Navbar/SignUpForm/SignUp";
import "./MainPage.css";
const MainPage = () => {
  const login = true;
  return (
    <>
      <div className="mainPage">{login && <SignUp />}</div>
    </>
  );
};

export default MainPage;
