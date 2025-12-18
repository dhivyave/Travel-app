

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hotelName: { type: String, required: true },
    hotelLocation: { type: String, required: true },
    guests: { type: Number, required: true },
    days: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     // User info (keep this)
//     name: { type: String, required: true },
//     email: { type: String, required: true },

//     // Hotel info (keep, but add IDs)
//     hotelId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Hotel",
//       required: true
//     },
//     hotelName: { type: String, required: true },
//     hotelLocation: { type: String, required: true },

//     // Room info (NEW – very important)
//     roomTypeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RoomType",
//       required: true
//     },
//     roomType: {
//       type: String, // Deluxe, Suite, etc.
//       required: true
//     },

//     // Dates (NEW – core for availability)
//     checkIn: { type: Date, required: true },
//     checkOut: { type: Date, required: true },

//     // Booking details
//     roomsBooked: { type: Number, required: true },
//     guests: { type: Number, required: true },

//     // Pricing (keep)
//     pricePerNight: { type: Number, required: true },
//     totalPrice: { type: Number, required: true }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);
