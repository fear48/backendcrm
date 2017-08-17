import express from "express";
import roomsController from "../controllers/tasksController";

const router = express.Router();

router.get("/", roomsController.getAllTasks);
router.post("/", roomsController.addNewTask);
router.get("/:id", roomsController.getTask);
router.put("/:id", roomsController.changeTaskInfo);
router.delete("/:id", roomsController.deleteTask);

export default router;
