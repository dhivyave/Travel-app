import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Get hotels by placeId
router.get("/:placeId", async (req, res) => {
  try {
    const hotels = await Hotel.find({ placeId: req.params.placeId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


// import express from "express";
// import Hotel from "../models/Hotel.js";
// import { searchRooms } from "../controllers/hotelController.js";

// const router = express.Router();

// // 🔍 Search rooms with availability (KEEP ON TOP)
// router.get("/search/rooms", searchRooms);

// // 🏨 Get hotels by placeId (KEEP AS IS)
// router.get("/:placeId", async (req, res) => {
//   try {
//     const hotels = await Hotel.find({ placeId: req.params.placeId });
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
