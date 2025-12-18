import React from "react";
import { Link } from "react-router-dom";
import "./ManaliExplore.css";

const manaliPlaces = [
  {
    id: 501,
    name: "Solang Valley",
    description: "Popular for adventure sports and scenic views.",
    image: "https://img.indiahighlight.com/fit-in/1090x600/ih/uploads/1733894516.jpg",
  },
  {
    id: 500,
    name: "Hidimba Devi Temple",
    description: "Ancient cave temple surrounded by cedar forest.",
    image: "https://www.sushanttravels.com/uploads/Hadimba_Devi_Temple_2.jpg",
  },
  {
    id: 502,
    name: "Rohtang Pass",
    description: "Snow-capped mountain pass, ideal for adventure lovers.",
    image: "https://media1.thrillophilia.com/filestore/4016azmjxihdjzufjc1yoqqtmke8_manali-rohtang-pass-147612479498-orijgp.jpg?w=400&dpr=2",
  },
  {
    id: 503,
    name: "Manikaran",
    description: "Famous for hot springs and Sikh temples.",
    image: "https://i.ytimg.com/vi/XZhXZdmrzpY/maxresdefault.jpg",
  },
];

const ManaliExplore = () => {
  return (
    <div className="manali-container">
      {/* Banner */}
      <div className="manali-banner">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-CozimMIagaj0RjhIncuVeSulyXP9w7ESw&s"
          alt="Manali Banner"
        />
        <h1 className="banner-title">Explore Manali</h1>
      </div>

      {/* Places */}
      <h2 className="section-title">Top Places in Manali</h2>
      <div className="places-grid">
        {manaliPlaces.map((place) => (
          <div key={place.id} className="place-card">
            <img src={place.image} alt={place.name} className="place-image" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <Link to={`/manali/${place.id}`}>
                <button className="view-btn">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManaliExplore;
