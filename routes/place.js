import express from "express";
import {
  createPlace,
  deletePlace,
  editOne,
  getAllPlaces,
  getOnePlace,
} from "../controllers/places.js";
import { verifyToken } from "../middleware/auth.js";
import {
  bookRoom,
  createRoom,
  deleteRoom,
  getRooms,
} from "../controllers/rooms.js";

const router = express.Router();

router.post("/addplace", verifyToken, createPlace);
router.get("/getAllPlaces", getAllPlaces);
router.get("/getOnePlace/:id", verifyToken, getOnePlace);
router.put("/editone/:id", verifyToken, editOne);
router.delete("/deleteplace/:id", verifyToken, deletePlace);
router.post("/createRoom/:hotelId", createRoom);
router.delete("/deleteRoom/:roomId/:hotelId", deleteRoom);
router.put("/bookRoom/:singleRoomId/:roomId/:hotelId", bookRoom);
router.get("/getRooms/:hotelId", getRooms);

export default router;
