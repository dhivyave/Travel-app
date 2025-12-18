

//new email.js


import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Bookings.css";

// 🔵 Create socket outside component (avoid duplicate connections)
const socket = io("http://localhost:5000", { transports: ["websocket"] });

function Bookings() {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const key = `bookings_${currentUser.email}`;

    // 🔹 Load existing bookings
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    setUserBookings(existing.reverse()); // latest on top

    socket.on("connect", () => {
      console.log("🟢 Connected to socket:", socket.id);
    });

    // 🔥 Live booking update listener
    const handleBookingUpdate = (data) => {
      if (data.user === currentUser.email) {
        const existingBookings = JSON.parse(localStorage.getItem(key)) || [];

        // Avoid duplicates
        const isDuplicate = existingBookings.some(
          (b) =>
            b.date === data.date &&
            b.hotelName === data.hotelName &&
            b.placeName === data.placeName
        );

        if (!isDuplicate) {
          const updated = [data, ...existingBookings];
          localStorage.setItem(key, JSON.stringify(updated));
          setUserBookings(updated);
        }
      }
    };

    socket.on("booking_update", handleBookingUpdate);

    // Cleanup
    return () => {
      socket.off("booking_update", handleBookingUpdate);
    };
  }, []);

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      {userBookings.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          No bookings found.
        </p>
      ) : (
        <div className="bookings-grid">
          {userBookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <img
                src={booking.image}
                alt={booking.hotelName}
                className="hotel-img"
              />

              <h3>{booking.hotelName}</h3>
              <p><strong>Place:</strong> {booking.placeName}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Days:</strong> {booking.days}</p>
              <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>
              <p><strong>Advance Paid:</strong> ₹{booking.advancePayment}</p>
              <p><strong>Date:</strong> {booking.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./Bookings.css";

// // 🔵 Create socket outside component to avoid duplicates
// const socket = io("http://localhost:5000", { transports: ["websocket"] });

// function Bookings() {
//   const [userBookings, setUserBookings] = useState([]);

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!currentUser) return;

//     const fetchBookings = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/bookings/user/${currentUser.email}`
//         );
//         const data = await res.json();
//         setUserBookings(data.reverse()); // latest on top
//       } catch (err) {
//         console.error("Error fetching user bookings:", err);
//       }
//     };

//     fetchBookings();

//     socket.on("connect", () => {
//       console.log("🟢 Connected to socket:", socket.id);
//     });

//     // 🔥 Live booking updates
//     const handleBookingUpdate = (booking) => {
//       if (booking.email === currentUser.email) {
//         setUserBookings((prev) => [booking, ...prev]);
//       }
//     };

//     socket.on("booking_update", handleBookingUpdate);

//     return () => {
//       socket.off("booking_update", handleBookingUpdate);
//     };
//   }, []);

//   return (
//     <div className="bookings-container">
//       <h1>My Bookings</h1>

//       {userBookings.length === 0 ? (
//         <p className="no-bookings-message">No bookings found.</p>
//       ) : (
//         <div className="bookings-grid">
//           {userBookings.map((booking) => (
//             <div key={booking._id} className="booking-card">
//               <img
//                 src={booking.image || "https://via.placeholder.com/130x95"}
//                 alt={booking.hotelName}
//                 className="hotel-img"
//               />
//               <h3>{booking.hotelName}</h3>
//               <p><strong>Place:</strong> {booking.hotelLocation}</p>
//               <p><strong>Room:</strong> {booking.roomType}</p>
//               <p><strong>Guests:</strong> {booking.guests}</p>
//               <p><strong>Days:</strong> {booking.days || 1}</p>
//               <p><strong>Total Cost:</strong> ₹{booking.totalPrice}</p>
//               <p><strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
//               <p><strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookings;
