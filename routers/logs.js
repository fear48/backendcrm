import express from "express";
import logsController from "../controllers/logsController";

const router = express.Router();

router.get("/", logsController.getAllLogs);
router.post("/", logsController.addNewLog);
router.get("/:id", logsController.getLogById);
router.put("/:id", logsController.changeLogInfo);
router.delete("/:id", logsController.deleteLog);
router.get("/u/:userId", logsController.getUserLogs);

export default router;
