
import express from "express";
import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send booking email
async function sendBookingEmail(userEmail, booking) {
  const { hotelName, hotelLocation, guests, days, price } = booking;

  await transporter.sendMail({
    from: `"Travel App" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Hotel Booking Confirmation",
    html: `
      <h2>Booking Confirmed ✅</h2>
      <p><strong>Hotel:</strong> ${hotelName}</p>
      <p><strong>Location:</strong> ${hotelLocation}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Days:</strong> ${days}</p>
      <p><strong>Total Price:</strong> ₹${price}</p>
    `,
  });
}

// Create booking
router.post("/", async (req, res) => {
  try {
    console.log("📩 Email from frontend:", req.body.email);

    const booking = new Booking(req.body);
    const saved = await booking.save();

    await sendBookingEmail(saved.email, saved);

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
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
