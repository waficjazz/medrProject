import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./components/Navbar/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Navbar/SignUpForm/SignUp";

function App() {
  return (
    <>
      <body>
        <SignUp />
        <Navbar />
        <MainPage />
      </body>
    </>
  );
}

export default App;
