import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Demo from "./Demo";
import Sign from "./Sign";
import Login from "./Login";
import GoaExplore from "./pages/GoaExplore";
import PlaceDetails from "./pages/PlaceDetails";
import DubaiExplore from "./pages/DubaiExplore";
import ManaliExplore from "./pages/ManaliExplore";
import FrontPage from "./FrontPage";
import SingaporeExplore from "./pages/SingaporeExplore";
import HotelDetails from "./pages/HotelDetails";
import ParisExplore from "./pages/ParisExplore";
import BaliExplore from "./pages/BaliExplore";
import Bookings from "./pages/Bookings";
import "./App.css";
import "./pages/HotelDetails.css";
//import RoomSearch from "./pages/RoomSearch";
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<Demo />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/login" element={<Login />} />

        <Route path="/goa" element={<GoaExplore />} />
        <Route path="/goa/:id" element={<PlaceDetails />} />

        <Route path="/dubai" element={<DubaiExplore />} />
        <Route path="/dubai/:id" element={<PlaceDetails />} />

        <Route path="/manali" element={<ManaliExplore />} />
        <Route path="/manali/:id" element={<PlaceDetails />} />

        <Route path="/singapore" element={<SingaporeExplore />} />
        <Route path="/singapore/:id" element={<PlaceDetails />} />

        <Route path="/paris" element={<ParisExplore />} />
        <Route path="/paris/:id" element={<PlaceDetails />} />

        <Route path="/bali" element={<BaliExplore />} />
        <Route path="/bali/:id" element={<PlaceDetails />} />

        <Route path="/bookings" element={<Bookings />} />
        {/* <Route path="/search" element={<RoomSearch />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
