import express from "express";
import roomsController from "../controllers/roomsController";

const router = express.Router();

router.get(roomsController.getAllRooms);
router.post("/", roomsController.addNewRoom);
router.get("/:id", roomsController.getRoom);
router.put("/:id", roomsController.changeRoomInfo);
router.delete("/:id", roomsController.deleteRoom);

export default router;
