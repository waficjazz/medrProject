import React from "react";
import SideBar from "../../components/Navbar/SideBar/SideBar";
import SignUp from "../../components/Navbar/SignUpForm/SignUp";
import "./MainPage.css";
const MainPage = () => {
  const login = true;
  return (
    <>
      <body>
        <SideBar />
        <div className="mainPage">{!login && <SignUp />}</div>
      </body>
    </>
  );
};

export default MainPage;
