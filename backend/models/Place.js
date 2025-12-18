import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  category: String, // beach, mountain, desert, etc.
});

export default mongoose.model("Place", placeSchema);
