import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

// Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
