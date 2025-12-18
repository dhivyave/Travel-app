// import React from "react";
// import "./HotelBooking.css";

// const HotelBooking = () => {
//   return (
//     <div className="hotel-container">
//       <h1>Hotel Booking in Goa</h1>
//       <p>Find your perfect stay among top-rated hotels and resorts in Goa.</p>

//       <div className="hotel-list">
//         <div className="hotel-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5iGNqWke9Hg5rm4Jt9nzJ5HN7ilzdAgG2A&s"
//             alt="Taj Resort"
//           />
//           <h3>Taj Exotica Resort</h3>
//           <p>Luxury 5-star resort with beachfront views and fine dining.</p>
//           <button className="book-btn">Book Now</button>
//         </div>

//         <div className="hotel-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSHgobWGYIff41XLi-zhMVAe_NM9ZQOlccTA&s"
//             alt="Whispering Palms"
//           />
//           <h3>Whispering Palms Beach Resort</h3>
//           <p>Cozy and vibrant resort near Candolim Beach.</p>
//           <button className="book-btn">Book Now</button>
//         </div>

//         <div className="hotel-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNG-cIRlkv3gQbgsX7SaYkDYyrmbsbG0CLtw&s"
//             alt="Marriott"
//           />
//           <h3>Marriott Goa</h3>
//           <p>Modern luxury hotel offering spa, pool, and sea views.</p>
//           <button className="book-btn">Book Now</button>
//         </div>
//          <div className="hotel-card">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSHgobWGYIff41XLi-zhMVAe_NM9ZQOlccTA&s"
//             alt="Whispering Palms"
//           />
//           <h3>whoopers boutique hotel </h3>
//           <p></p>
//           <button className="book-btn">Book Now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelBooking;


import React from "react";
import { useParams, Link } from "react-router-dom";
import "./HotelDetails.css";

const allHotels = [
  // --- Hotels near Baga Beach ---
  {
    id: 1,
    name: "Whoopers Boutique Hotel, Anjuna",
    area: "Baga Beach",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/431430451.jpg?k=8efbb8e8f6ee867f91b0a0b2c16f5f1c7e91e22fcb68915f0a3c49bfb5a51f3a&o=&hp=1",
    pricePerNight: "₹4,200/night",
    rating: 4.5,
    facilities: ["Free WiFi", "Breakfast Included", "Pool", "Parking"],
  },
  {
    id: 2,
    name: "Fiesta Beach Resort",
    area: "Baga Beach",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/70/5a/ed/exterior-view.jpg?w=700&h=-1&s=1",
    pricePerNight: "₹6,000/night",
    rating: 4.2,
    facilities: ["Pool", "Beach View", "WiFi"],
  },
  {
    id: 3,
    name: "Acron Waterfront Resort",
    area: "Baga Beach",
    image: "https://pix10.agoda.net/hotelImages/531/531211/531211_16042013500041798536.jpg",
    pricePerNight: "₹7,500/night",
    rating: 4.7,
    facilities: ["Spa", "Pool", "Luxury Rooms"],
  },

  // --- Hotels near Anjuna Flea Market ---
  {
    id: 4,
    name: "Anjuna Beach Resort",
    area: "Anjuna Flea Market",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/302179571.jpg?k=486fa5f6a9a31b4fbb36e4a0b9ffb60b5406a8f6d4d947db92bb94b98a4e5d4d&o=",
    pricePerNight: "₹3,800/night",
    rating: 4.1,
    facilities: ["Breakfast", "Pool", "WiFi"],
  },
  {
    id: 5,
    name: "The Ivy Anjuna",
    area: "Anjuna Flea Market",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/2f/2e/88/the-ivy-anjuna.jpg?w=700&h=-1&s=1",
    pricePerNight: "₹5,200/night",
    rating: 4.3,
    facilities: ["Restaurant", "AC Rooms", "Pool"],
  },
];

function HotelBooking() {
  const { placeName } = useParams();

  // Filter hotels based on the place
  const nearbyHotels = allHotels.filter(
    (hotel) => hotel.area.toLowerCase() === placeName.toLowerCase()
  );

  return (
    <div className="hotel-details-container">
      <Link to="/" className="back-link">⬅ Back</Link>
      <h1>Hotels near {placeName}</h1>

      {nearbyHotels.length === 0 ? (
        <p>No hotels found near {placeName}</p>
      ) : (
        <div className="rooms-list">
          {nearbyHotels.map((hotel) => (
            <div key={hotel.id} className="room-card">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="hotel-img"
              />
              <h3>{hotel.name}</h3>
              <p><strong>Rating:</strong> ⭐ {hotel.rating}</p>
              <p><strong>Price:</strong> {hotel.pricePerNight}</p>
              <p><strong>Facilities:</strong> {hotel.facilities.join(", ")}</p>
              <Link to={`/hotel/${hotel.id}`}>
                <button className="book-room-btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelBooking;
