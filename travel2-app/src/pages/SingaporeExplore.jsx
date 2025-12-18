import React from "react";
import { Link } from "react-router-dom";
import "./SingaporeExplore.css";

const singaporePlaces = [
  {
    id: 201,
    name: "Marina Bay Sands",
    description: "Iconic hotel and SkyPark with panoramic city views.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhEWRQ1gaTwV8XT7Ads86YKdM0xJmoFLXTgw&s",
  },
  {
    id: 202,
    name: "Gardens by the Bay",
    description: "Futuristic gardens with Supertree Grove and Cloud Forest.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOcKDW58b0QYTWsoLjR7T690SqwNbE47UFg&s",
  },
  {
    id: 203,
    name: "Sentosa Island",
    description: "Resort island known for beaches, Universal Studios, and SEA Aquarium.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5be172e38f513032e447734b/1558366937124-5ZJ9AAZ5Z721YPY0T588/Sentosa-Picture.jpg",
  },
  {
    id: 204,
    name: "Merlion Park",
    description: "Home to Singapore’s iconic half-lion, half-fish statue.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vj7BzxkIHbMQgVBCxSIEHI2CV2gxjuILMg&s",
  },
  {
    id: 205,
    name: "Singapore Zoo",
    description: "World-famous open-concept zoo surrounded by lush rainforest.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiBAmlvtJhplx8kUIByHu1xCHUYOtE7wjyQ&s",
  },
];

const SingaporeExplore = () => {
  return (
    <div className="goa-container">
      {/* Banner Section */}
      <div className="goa-banner">
        <img
          src="https://s.abcnews.com/images/Lifestyle/GTY_singapore_jt_160402_16x9_992.jpg"
          alt="Singapore Banner"
        />

        <div className="banner-content">
         

          {/* ✅ Book Hotel Button */}
         
        </div>
      </div>

      {/* Places Section */}
      <h2 className="section-title">Top Places to Visit</h2>
      <div className="places-grid">
        {singaporePlaces.map((place) => (
          <div key={place.id} className="place-card">
            <img src={place.image} alt={place.name} className="place-image" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>

              {/* View More Button */}
              <Link to={`/singapore/${place.id}`}>
                <button className="view-btn">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingaporeExplore;
