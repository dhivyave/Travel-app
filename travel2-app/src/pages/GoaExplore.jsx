// import React from "react";
// import { Link } from "react-router-dom";  // ✅ Import Link for navigation
// import "./GoaExplore.css"; // import css file

// const goaPlaces = [
//   {
//     id: 1,
//     name: "Baga Beach",
//     description: "Famous for nightlife, water sports, and beach shacks.",
//     image: "https://s7ap1.scene7.com/is/image/incredibleindia/baga-beach-goa-goa-baga-beach-2-attr-hero?qlt=82&ts=1742170629407",
//   },
//   {
//     id: 2,
//     name: "Fort Aguada",
//     description: "17th-century Portuguese fort overlooking the Arabian Sea.",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxJGlRKzRU9h1st5Z1OPTV-C_jW9qJwe-KA&s",
//   },
//   {
//     id: 3,
//     name: "Dudhsagar Waterfalls",
//     description: "One of India’s tallest waterfalls, breathtaking in monsoon.",
//     image: "https://3.imimg.com/data3/CM/FG/MY-9863021/dudhsagar-waterfall-tambdi-surla-ancient-temple.jpeg",
//   },
//   {
//     id: 4,
//     name: "Basilica of Bom Jesus",
//     description: "UNESCO site with Baroque architecture.",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ld1ScIcpChhXRnCsf1FPlGCcqoSy4CVlkw&s",
//   },
//   {
//     id: 5,
//     name: "Anjuna Flea Market",
//     description: "Lively market for clothes, handicrafts, and souvenirs.",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RmAr3XyYnEdR0H6mXh-lr5A4YgaTnPQDnNxYbXfCe_k2hzQ65YbcgPqNvJqbm93NQYc&usqp=CAU",
//   },
// ];

// const GoaExplore = () => {
//   return (
//     <div className="goa-container">
//       {/* Banner */}
//       <div className="goa-banner">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeZyB5V3gUABwLA-YYfdx1Yl24Hcc_qsaXQ&s"
//           alt="Goa Banner"
//         />
//         <h1 className="banner-title">Explore Goa</h1>
//       </div>

//       {/* Places List */}
//       <h2 className="section-title">Top Places to Visit</h2>
//       <div className="places-grid">
//         {goaPlaces.map((place) => (
//           <div key={place.id} className="place-card">
//             <img src={place.image} alt={place.name} className="place-image" />
//             <div className="place-info">
//               <h3>{place.name}</h3>
//               <p>{place.description}</p>
//               {/* ✅ Link to PlaceDetails page */}
//               <Link to={`/goa/${place.id}`}>
//                 <button className="view-btn">View More</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GoaExplore;


import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./GoaExplore.css";

const goaPlaces = [
  {
    id: 1,
    name: "Baga Beach",
    description: "Famous for nightlife, water sports, and beach shacks.",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/baga-beach-goa-goa-baga-beach-2-attr-hero?qlt=82&ts=1742170629407",
       popularity: "top",
  },
  {
    id: 2,
    name: "Fort Aguada",
    description: "17th-century Portuguese fort overlooking the Arabian Sea.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxJGlRKzRU9h1st5Z1OPTV-C_jW9qJwe-KA&s",
       popularity: "top",
  },
  {
    id: 3,
    name: "Dudhsagar Waterfalls",
    description: "One of India’s tallest waterfalls, breathtaking in monsoon.",
    image:
      "https://3.imimg.com/data3/CM/FG/MY-9863021/dudhsagar-waterfall-tambdi-surla-ancient-temple.jpeg",
       popularity: "medium",
  },
  {
    id: 4,
    name: "Basilica of Bom Jesus",
    description: "UNESCO site with Baroque architecture.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ld1ScIcpChhXRnCsf1FPlGCcqoSy4CVlkw&s",
       popularity: "medium",
  },
  {
    id: 5,
    name: "Anjuna Flea Market",
    description: "Lively market for clothes, handicrafts, and souvenirs.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RmAr3XyYnEdR0H6mXh-lr5A4YgaTnPQDnNxYbXfCe_k2hzQ65YbcgPqNvJqbm93NQYc&usqp=CAU",
       popularity: "low",
  },
  {
    id: 6,
    name: "77-foot Lord Ram Statue & Ramayana Theme Park",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIBAuwMtLw2VxCieIbkMRp2DtRNgj2pCbCDkTm5R3rx9byT4xDTs3zZErKKJAx_21BCt0&usqp=CAU"
  ,
    description: "A towering statue of Lord Ram and a theme park based on the Ramayana epic.",
     popularity: "top",
  },
  {
    id: 7,
    name: "Calangute Beach",
    description: "Popular beach with lively shacks, water sports, and nightlife.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfX7yW7MV5rUGo4LFs_hm3FXkfHTbCqh81ag&s",
    popularity: "top",
  },
  {
    id: 8,
    name: "Chapora Fort",
    description: "Scenic fort overlooking Vagator Beach, famous for sunset views.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLg-OSnrGeVeFmuqRm4skFgoVJt1wYLq81g&s",
    popularity: "medium",
  },
  {
    id: 9,
    name: "Morjim Beach",
    description: "Quieter beach, famous for Olive Ridley turtle nesting.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYUwtHsaL8u0Yfy8uHe9VJIHr7fJdJRv5mA&s",
    popularity: "low",
  },
  {
    id: 10,
    name: "Se Cathedral",
    description: "One of the largest churches in Asia, UNESCO heritage site.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeLpLvp8NFUdkvfbsPP8tZu_HzSJ0xt8zQw&s",
    popularity: "medium",
  },
];

const GoaExplore = () => {
  const [filter, setFilter] = useState(""); // top / medium / low / empty = all

  // Filtered spots
  const filteredPlaces = filter
    ? goaPlaces.filter((place) => place.popularity === filter)
    : goaPlaces;
  return (
    <div className="goa-container">
      {/* Banner Section */}
      <div className="goa-banner">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=600&h=500&s=1"
          alt="Goa Banner"
        />

        <div className="banner-content">
         

          {/* ✅ Book Hotel Button */}
         
        </div>
      </div>
{/* Filter Buttons */}
      
<div className="filter-buttons">
  {["top", "medium", "low", ""].map((type, idx) => (
    <button
      key={idx}
      className={filter === type ? "filter-btn active" : "filter-btn"}
      onClick={() => setFilter(type)}
      title={type === "" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
    >
      {type === "" ? "All" : type.charAt(0).toUpperCase()}
    </button>
  ))}
</div>

     {/* Places Section */}
<h2 className="section-title">Top Places to Visit</h2>
<div className="places-grid">
  {filteredPlaces.length > 0 ? (
    filteredPlaces.map((place) => (
      <div key={place.id} className="place-card">
        <img src={place.image} alt={place.name} className="place-image" />
        <div className="place-info">
          <h3>{place.name}</h3>
          <p>{place.description}</p>

          {/* View More Button */}
          <Link to={`/goa/${place.id}`}>
            <button className="view-btn">View More</button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p style={{ textAlign: "center", color: "#ff6f61" }}>
      No places found for this filter.
    </p>
  )}
</div>
    </div>
  );
};

export default GoaExplore;
