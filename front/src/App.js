import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUpForm/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <SignUp /> */}
        <Navbar />
        <MainPage />
      </BrowserRouter>
    </>
  );
}

export default App;
