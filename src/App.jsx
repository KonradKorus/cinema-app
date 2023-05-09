import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Repertoire from "./pages/Repertoire/Repertoire";
import Reservation from "./pages/Reservation/Reservation";
import Profile from "./pages/Profile/Profile";
import MovieDescription from "./pages/MovieDescription/MovieDescription";

function App() {
  return (
    <div className="App">
        <Navbar/>

        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/admin-panel" element={<AdminPanel/>}></Route>
            <Route path="/repertoire" element={<Repertoire/>}></Route>
            <Route path="/reservation" element={<Reservation/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/movie-description" element={<MovieDescription/>}></Route>
        </Routes>
        
        <Footer/>
    </div>
  );
}

export default App;
