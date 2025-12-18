import express from "express";
import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Create booking + send email
router.post("/", async (req, res) => {
  try {
    // 🔍 DEBUG: check email from frontend
    console.log("📩 Email from frontend:", req.body.email);

    const booking = new Booking(req.body);
    const saved = await booking.save();

    // 📧 Send confirmation email
    await transporter.sendMail({
      from: `"Travel App" <${process.env.EMAIL_USER}>`,
      to: saved.email, // USER EMAIL
      subject: "Hotel Booking Confirmation",
      html: `
        <h2>Booking Confirmed ✅</h2>
        <p><strong>Hotel:</strong> ${saved.hotelName}</p>
        <p><strong>Guests:</strong> ${saved.guests}</p>
        <p><strong>Days:</strong> ${saved.days}</p>
        <p><strong>Total Price:</strong> ₹${saved.price}</p>
      `,
    });

    res.status(201).json({
      message: "Booking successful & email sent",
      booking: saved,
    });
  } catch (err) {
    console.error("❌ Booking/email error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("hotelId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;











// import express from "express";
// import Booking from "../models/Booking.js";
// import Hotel from "../models/Hotel.js";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// /* ===============================
//    Nodemailer Transporter
// ================================ */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* ===============================
//    CREATE BOOKING (FINAL VERSION)
// ================================ */
// router.post("/", async (req, res) => {
//   try {
//     const { hotelId, days, guests, email } = req.body;

//     // 🛑 Validation
//     if (!hotelId || !days || !guests || !email) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // 🏨 Fetch hotel from DB
//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     // 💰 BACKEND PRICE CALCULATION (SOURCE OF TRUTH)
//     const totalCost = hotel.cost.day * days * guests;
//     const advancePayment = Math.floor(totalCost * 0.25);

//     // 📝 Create booking
//     const booking = new Booking({
//       email,
//       hotelId,
//       hotelName: hotel.name,
//       hotelLocation: hotel.location,
//       guests,
//       days,
//       price: totalCost,
//       advancePayment,
//     });

//     const savedBooking = await booking.save();

//     // 📧 Send confirmation email
//     await transporter.sendMail({
//       from: `"Travel App" <${process.env.EMAIL_USER}>`,
//       to: savedBooking.email,
//       subject: "Hotel Booking Confirmation",
//       html: `
//         <h2>Booking Confirmed ✅</h2>
//         <p><strong>Hotel:</strong> ${savedBooking.hotelName}</p>
//         <p><strong>Location:</strong> ${savedBooking.hotelLocation}</p>
//         <p><strong>Guests:</strong> ${savedBooking.guests}</p>
//         <p><strong>Days:</strong> ${savedBooking.days}</p>
//         <p><strong>Total Price:</strong> ₹${savedBooking.price}</p>
//         <p><strong>Advance Paid:</strong> ₹${savedBooking.advancePayment}</p>
//       `,
//     });

//     res.status(201).json({
//       message: "Booking successful & email sent",
//       booking: savedBooking,
//     });
//   } catch (error) {
//     console.error("❌ Booking Error:", error);
//     res.status(500).json({ message: "Booking failed" });
//   }
// });

// /* ===============================
//    GET ALL BOOKINGS
// ================================ */
// router.get("/", async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("hotelId");
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
