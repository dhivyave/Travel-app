import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  name: String,
  image: String,
  costPerDay: Number,
  rooms: Number,
  contact: String,
});

export default mongoose.model("Hotel", hotelSchema);
