import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Repertoire from './pages/Repertoire/Repertoire';
import Reservation from './pages/Reservation/Reservation';
import Profile from './pages/Profile/Profile';
import MovieDescription from './pages/MovieDescription/MovieDescription';
import { Divider } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import ReservationDetails from './pages/ReservationDetails/ReservationDetails';
import Movies from './pages/AdminPanel/Movies/Movies';
import Events from './pages/AdminPanel/Events/Events';
import ChangePassword from './pages/Profile/ChangePassword';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div style={{ marginTop: '75px' }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/admin-panel" element={<AdminPanel />}></Route>
            <Route path="/repertoire" element={<Repertoire />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/events" element={<Events />}></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
            <Route
              path="/reservation/:eventId"
              element={<Reservation />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route
              path="/movie-description/:movieId"
              element={<MovieDescription />}
            ></Route>
            <Route
              path="/reservation-details/:reservationId"
              element={<ReservationDetails />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
