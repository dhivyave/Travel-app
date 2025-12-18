// // import RoomType from "../models/RoomType.js";
// // import Booking from "../models/Booking.js";

// // export const searchRooms = async (req, res) => {
// //   try {
// //     const { checkIn, checkOut } = req.query;

// //     if (!checkIn || !checkOut) {
// //       return res.status(400).json({
// //         message: "checkIn and checkOut dates are required"
// //       });
// //     }

// //     const rooms = await RoomType.find().populate("hotelId");

// //     const result = [];

// //     for (let room of rooms) {
// //       const bookings = await Booking.find({
// //         roomTypeId: room._id,
// //         checkIn: { $lt: new Date(checkOut) },
// //         checkOut: { $gt: new Date(checkIn) }
// //       });

// //       const bookedRooms = bookings.reduce(
// //         (sum, b) => sum + b.roomsBooked,
// //         0
// //       );

// //       result.push({
// //         hotelName: room.hotelId.name,
// //         hotelLocation: room.hotelId.location,
// //         roomType: room.type,
// //         pricePerNight: room.pricePerNight,
// //         availableRooms: room.totalRooms - bookedRooms
// //       });
// //     }

// //     res.json(result);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };




// import RoomType from "../models/RoomType.js";
// import Booking from "../models/Booking.js";

// export const searchRooms = async (req, res) => {
//   try {
//     const { checkIn, checkOut } = req.query;

//     if (!checkIn || !checkOut) {
//       return res.status(400).json({
//         message: "checkIn and checkOut dates are required"
//       });
//     }

//     const rooms = await RoomType.find().populate("hotelId");

//     const result = [];

//     for (let room of rooms) {
//       let bookings = [];

//       try {
//         bookings = await Booking.find({
//           roomTypeId: room._id,
//           checkIn: { $lt: new Date(checkOut) },
//           checkOut: { $gt: new Date(checkIn) }
//         });
//       } catch (e) {
//         bookings = [];
//       }

//       const bookedRooms = bookings.reduce(
//         (sum, b) => sum + (b.roomsBooked || 0),
//         0
//       );

//       result.push({
//         hotelName: room.hotelId?.name || "Unknown Hotel",
//         hotelLocation: room.hotelId?.location || "Unknown Location",
//         roomType: room.type,
//         pricePerNight: room.pricePerNight,
//         availableRooms: room.totalRooms - bookedRooms
//       });
//     }

//     res.json(result);
//   } catch (error) {
//     console.error("SEARCH ROOMS ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
