import React, { useState } from "react";
import "./RoomSearch.css";

// Backend API URL
const API_BASE = "http://localhost:5000/api";

function RoomSearch() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search rooms from backend
  const handleSearch = async () => {
    if (!checkIn || !checkOut) return alert("Please select dates");

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/hotels/search/rooms?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await res.json();
      setAvailableRooms(data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      alert("Failed to fetch rooms");
    }
    setLoading(false);
  };

  // Book a room
  const handleBookNow = async (room) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return alert("Please login first");

    const numberOfDays =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const bookingData = {
      name: currentUser.name,
      email: currentUser.email,
      hotelId: room.hotelId,
      hotelName: room.hotelName,
      hotelLocation: room.hotelLocation,
      roomTypeId: room._id,
      roomType: room.roomType,
      checkIn,
      checkOut,
      roomsBooked: 1,
      guests,
      pricePerNight: room.pricePerNight,
      totalPrice: room.pricePerNight * numberOfDays,
    };

    try {
      const res = await fetch(`${API_BASE}/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Booking failed");

      const result = await res.json();
      alert("Booking successful!");
      console.log("Booking:", result);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed, please try again");
    }
  };

  return (
    <div className="room-search-container">
      <h2>Search Rooms</h2>

      <div className="search-controls">
        <div>
          <label>Check-in:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label>Check-out:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div>
          <label>Guests:</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading rooms...</p>
      ) : availableRooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <div className="rooms-grid">
          {availableRooms.map((room) => (
            <div key={room._id} className="room-card">
              <h3>{room.hotelName}</h3>
              <p><strong>Location:</strong> {room.hotelLocation}</p>
              <p><strong>Room Type:</strong> {room.roomType}</p>
              <p><strong>Price/Night:</strong> ₹{room.pricePerNight}</p>
              <p><strong>Available Rooms:</strong> {room.availableRooms}</p>
              <button onClick={() => handleBookNow(room)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomSearch;
