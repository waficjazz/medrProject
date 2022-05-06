import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./components/Navbar/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Navbar/SignUpForm/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <body>
          {/* <SignUp /> */}
          <Navbar />
          <MainPage />
        </body>
      </BrowserRouter>
    </>
  );
}

export default App;
