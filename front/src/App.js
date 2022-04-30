import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./components/Navbar/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <body>
        <Navbar />
        <SideBar />
        <MainPage />
      </body>
    </>
  );
}

export default App;
