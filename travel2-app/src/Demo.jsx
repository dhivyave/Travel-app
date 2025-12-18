


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Demo.css"; // ✅ Make sure to create this file for styling

// function Demo() {
//   return (
//     <div className="demo-container">
//       <h1 className="main-title">Explore the World with Us 🌍</h1>
//       <h2 className="subtitle">
//         Find amazing travel packages, book your dream trip, and make memories!
//       </h2>

//       <h1 className="section-title">Popular Destinations</h1>

//       <div className="explore">
//         {/* GOA */}
//         <div className="destination-card">
//           <h3>GOA</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgSnqLtqOC_TIFbmPCaFiOw97Eef_A8P5glA&s"
//             alt="Goa"
//           />
//           <Link to="/goa">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>

//         {/* DUBAI */}
//         <div className="destination-card">
//           <h3>DUBAI</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIDqyUlAsy8DObzxaut8BE2uf5dTgKueMbg&s"
//             alt="Dubai"
//           />
//           <Link to="/dubai">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>

//         {/* MANALI */}
//         <div className="destination-card">
//           <h3>MANALI</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtAor9dnamhLSHvqPyIn85PxsMgYt28jvAO-SSCbYyQqSneXCROFLYSxvIOdplZUvkVPk&usqp=CAU"
//             alt="Manali"
//           />
//           <Link to="/manali">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>
//       </div>

//       {/* Login and Signup buttons */}
     
//     </div>
//   );
// }

// export default Demo;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Demo.css";

// function Demo() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // List of supported destinations
//   const destinations = [
//     "goa",
//     "dubai",
//     "manali",
//     "singapore",
//     "paris",
//     "bali",
//     "maldives",
//     "london",
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const search = searchTerm.toLowerCase();

//     // ✅ Find destination that starts with or includes the search term
//     const matched = destinations.find((d) => d.startsWith(search) || d.includes(search));

//     if (matched) {
//       navigate(`/${matched}`);
//     } else {
//       alert(
//         "Destination not found! Try Goa, Dubai, Manali, Singapore, Paris, Bali, Maldives, or London."
//       );
//     }
//   };

//   return (
//     <div className="demo-container">
//       <h1 className="main-title">Explore the World with Us 🌍</h1>
//       <h2 className="subtitle">
//         Find amazing travel packages, book your dream trip, and make memories!
//       </h2>

//       {/* 🔍 Search Bar */}
//       <form className="search-bar" onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search your destination..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           list="suggestions"
//         />
//         <button type="submit">Search</button>

//         {/* ✅ Auto-suggestions for partial matches */}
//         <datalist id="suggestions">
//           {destinations
//             .filter((d) => d.toLowerCase().includes(searchTerm.toLowerCase()))
//             .map((d, index) => (
//               <option key={index} value={d} />
//             ))}
//         </datalist>
//       </form>

//       <h1 className="section-title">Popular Destinations</h1>

//       <div className="explore">
//         {/* GOA */}
//         <div className="destination-card">
//           <h3>GOA</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgSnqLtqOC_TIFbmPCaFiOw97Eef_A8P5glA&s"
//             alt="Goa"
//           />
//           <Link to="/goa">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>

//         {/* DUBAI */}
//         <div className="destination-card">
//           <h3>DUBAI</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIDqyUlAsy8DObzxaut8BE2uf5dTgKueMbg&s"
//             alt="Dubai"
//           />
//           <Link to="/dubai">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>

//         {/* MANALI */}
//         <div className="destination-card">
//           <h3>MANALI</h3>
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtAor9dnamhLSHvqPyIn85PxsMgYt28jvAO-SSCbYyQqSneXCROFLYSxvIOdplZUvkVPk&usqp=CAU"
//             alt="Manali"
//           />
//           <Link to="/manali">
//             <button className="explore-btn">Explore Now</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Demo;



//After BOOKINGS ADDED

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Demo.css";

function Demo() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // List of supported destinations
  const destinations = [
    "goa",
    "dubai",
    "manali",
    "singapore",
    "paris",
    "bali",
    "maldives",
    "london",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchTerm.toLowerCase();

    // ✅ Find destination that starts with or includes the search term
    const matched = destinations.find(
      (d) => d.startsWith(search) || d.includes(search)
    );

    if (matched) {
      navigate(`/${matched}`);
    } else {
      alert(
        "Destination not found! Try Goa, Dubai, Manali, Singapore, Paris, Bali, Maldives, or London."
      );
    }
  };

  return (
    <div className="demo-container">
      <h1 className="main-title">Explore the World with Us 🌍</h1>
      <h2 className="subtitle">
        Find amazing travel packages, book your dream trip, and make memories!
      </h2>

      {/* 🔍 Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search your destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          list="suggestions"
        />
        <button type="submit">Search</button>

        {/* ✅ Auto-suggestions for partial matches */}
        <datalist id="suggestions">
          {destinations
            .filter((d) =>
              d.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((d, index) => (
              <option key={index} value={d} />
            ))}
        </datalist>
      </form>

      {/* 🧾 My Bookings Button */}
      <div className="bookings-button-container">
        <Link to="/bookings" className="bookings-btn">
          🧾 My Bookings
        </Link>
      </div>

      <h1 className="section-title">Popular Destinations</h1>

      <div className="explore">
        {/* GOA */}
        <div className="destination-card">
          <h3>GOA</h3>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgSnqLtqOC_TIFbmPCaFiOw97Eef_A8P5glA&s"
            alt="Goa"
          />
          <Link to="/goa">
            <button className="explore-btn">Explore Now</button>
          </Link>
        </div>

        {/* DUBAI */}
        <div className="destination-card">
          <h3>DUBAI</h3>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSIDqyUlAsy8DObzxaut8BE2uf5dTgKueMbg&s"
            alt="Dubai"
          />
          <Link to="/dubai">
            <button className="explore-btn">Explore Now</button>
          </Link>
        </div>

        {/* MANALI */}
        <div className="destination-card">
          <h3>MANALI</h3>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtAor9dnamhLSHvqPyIn85PxsMgYt28jvAO-SSCbYyQqSneXCROFLYSxvIOdplZUvkVPk&usqp=CAU"
            alt="Manali"
          />
          <Link to="/manali">
            <button className="explore-btn">Explore Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Demo;
