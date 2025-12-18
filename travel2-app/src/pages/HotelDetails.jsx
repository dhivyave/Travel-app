import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HotelBooking.css";

const nearbyHotels = {
  "Baga Beach": [
    {
      id: 4,
      name: "Whoopers Boutique Hotel",
      img: "https://lh3.googleusercontent.com/p/AF1QipMYMSz0TUrLR-WKqVbJDJAsLBV4lVZEnKuvy9Dg=w296-h202-n-k-rw-no-v1",
      rating: 4.5,
      price: 2500,
    },
    {
      id: 1,
      name: "Taj Exotica Resort",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5iGNqWke9Hg5rm4Jt9nzJ5HN7ilzdAgG2A&s",
      rating: 4.8,
      price: 9000,
    },
  ],
  "Fort Aguada": [
    {
      id: 1,
      name: "Taj Exotica Resort",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5iGNqWke9Hg5rm4Jt9nzJ5HN7ilzdAgG2A&s",
      rating: 4.8,
      price: 9500,
    },
  ],
};

const HotelBooking = () => {
  const [visiblePlace, setVisiblePlace] = useState(null);

  const toggleHotels = (placeName) => {
    setVisiblePlace(visiblePlace === placeName ? null : placeName);
  };

  return (
    <div className="hotel-container">
      <h1>Hotels in Goa</h1>
      <p>Choose a popular destination below to view nearby hotels.</p>

      {Object.keys(nearbyHotels).map((place) => (
        <div key={place} className="place-section">
          <h2>{place}</h2>
          <button
            className="view-hotels-btn"
            onClick={() => toggleHotels(place)}
          >
            {visiblePlace === place ? "Hide Hotels" : "View Hotels"}
          </button>

          {visiblePlace === place && (
            <div className="nearby-hotels">
              {nearbyHotels[place].map((hotel, index) => (
                <div key={index} className="hotel-card">
                  <img src={hotel.img} alt={hotel.name} />
                  <h3>{hotel.name}</h3>
                  <p>
                    ⭐ {hotel.rating} &nbsp;&nbsp; 💰 ₹{hotel.price} per night
                  </p>

                  {/* ✅ Navigate to detailed Hotel page */}
                  <Link to={`/hotel/${hotel.id}`}>
                    <button className="book-btn">Book Now</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelBooking;
