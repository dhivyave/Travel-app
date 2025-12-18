// import sendBookingEmail from "./mailer.js"; // path must point to mailer.js

// const testBooking = {
//   hotelName: "Ocean View Resort",
//   hotelLocation: "Goa",
//   guests: 2,
//   days: 3,
//   price: 12000
// };

// // Wrap in async function so we can use await
// async function testEmail() {
//   try {
//     await sendBookingEmail("yourrealemail@gmail.com", testBooking);
//     console.log("Test email sent successfully!");
//   } catch (err) {
//     console.error("Error sending test email:", err);
//   }
// }

// testEmail();




import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhivyavenkat2005@gmail.com",   // SAME email
    pass: "xjwtpuazbsshdhqn"       // 16-digit app password
  }
});

const mailOptions = {
  from: '"Travel App" <dhivyavenkat2005@gmail.com>',
  to: "dhivyavenkat2005@gmail.com", // send to yourself first
  subject: "Test Email",
  text: "If you got this, Nodemailer works!"
};

transporter.sendMail(mailOptions)
  .then(() => console.log("✅ Email sent successfully"))
  .catch(err => console.error("❌ Email error:", err));

