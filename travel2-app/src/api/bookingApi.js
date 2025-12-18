// export const createBooking = async (bookingData) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/bookings/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bookingData)
//     });
//     if (!res.ok) throw new Error("Booking failed");
//     return await res.json();
//   } catch (err) {
//     console.error("Booking API error:", err);
//   }
// };
