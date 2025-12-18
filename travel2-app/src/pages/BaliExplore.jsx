import React from "react";
import { Link } from "react-router-dom";
import "./BaliExplore.css"; // duplicate GoaExplore.css and rename

const baliPlaces = [
  {
    id: 901,
    name: "Uluwatu Temple",
    description: "Cliffside sea temple famous for sunset views and Kecak dance.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzi8G3SxTzYc6Y9hj5gFxR3v5Yt7F6V3EoWw&s",
  },
  {
    id: 902,
    name: "Tegallalang Rice Terrace",
    description: "Iconic rice fields known for greenery and Instagram spots.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVC230A3qwP0k6JAFgw9lCpP_q2m6yt4V0Hw&s",
  },
  {
    id: 903,
    name: "Mount Batur",
    description: "Popular sunrise trekking spot with scenic volcanic views.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR72hAzPR4RjcQe7_ro3_0Ps4D35fsJvycA&s",
  },
  {
    id: 904,
    name: "Ubud Monkey Forest",
    description: "Sacred nature park home to 1,200 monkeys and temples.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGpjXs7YSNzvz7cwuQWGmvbT8sYV1gs5H2g&s",
  },
  {
    id: 905,
    name: "Seminyak Beach",
    description: "Trendy spot for nightlife, cafes, and luxurious resorts.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmAmzpcjjwYfLL1ytcTmOaykJVpS0YyGc9Q&s",
  },
  {
    id: 906,
    name: "Nusa Penida",
    description: "Island paradise famous for Kelingking Beach & snorkeling.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPpocVXMr1g7MBlP1uR0V95uTmQB0OLM__yw&s",
  },
];

const BaliExplore = () => {
  return (
    <div className="goa-container">
      {/* Banner Section */}
      <div className="goa-banner">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TacCgq7EftK25RCPH-OTilb_w7b3SurJAg&s"
          alt="Bali Banner"
        />
        <div className="banner-content">
          <h1 className="banner-title">Explore Bali</h1>
        </div>
      </div>

      {/* Places Section */}
      <h2 className="section-title">Top Places to Visit</h2>
      <div className="places-grid">
        {baliPlaces.map((place) => (
          <div key={place.id} className="place-card">
            <img src={place.image} alt={place.name} className="place-image" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>

              {/* View More Button */}
              <Link to={`/bali/${place.id}`}>
                <button className="view-btn">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaliExplore;
