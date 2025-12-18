import React from "react";
import { Link } from "react-router-dom";
import "./ParisExplore.css";

const parisPlaces = [
  {
    id: 801,
    name: "Eiffel Tower",
    description: "Iconic wrought-iron landmark offering panoramic city views.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHVfss8z_KHmkXBTe0cLOL44drTqFCx5em4tQlX7F9WO46JzwaOIISr7s0PpFobj8LkJg&usqp=CAU",
  },
  {
    id: 802,
    name: "Louvre Museum",
    description:
      "World's largest art museum, home to the Mona Lisa and countless masterpieces.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQrwqdR6-fZOkZQI3fFDnmVD-lycEWlCP8A&s",
  },
  {
    id: 803,
    name: "Notre Dame Cathedral",
    description:
      "Gothic medieval cathedral known for its architecture and historical significance.",
    image:
      "https://i.pinimg.com/736x/96/a1/68/96a168fdcdb1a71a569424aecdb4f789.jpg",
  },
  {
    id: 804,
    name: "Arc de Triomphe",
    description:
      "Famous triumphal arch honoring those who fought and died for France.",
    image:
      "https://cdn.britannica.com/66/80466-050-2E125F5C/Arc-de-Triomphe-Paris-France.jpg",
  },
 
];

const ParisExplore = () => {
  return (
    <div className="paris-container">
      {/* Banner */}
      <div className="paris-banner">
        <img
          src="https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg"
          alt="Paris Banner"
        />
        <h1 className="banner-title">Explore Paris</h1>
      </div>

      {/* Places */}
      <h2 className="section-title">Top Places in Paris</h2>
      <div className="places-grid">
        {parisPlaces.map((place) => (
          <div key={place.id} className="place-card">
            <img src={place.image} alt={place.name} className="place-image" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <Link to={`/paris/${place.id}`}>
                <button className="view-btn">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParisExplore;
