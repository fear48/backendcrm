import express from "express";
import userController from "../controllers/userController";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.changeUserInfo);
router.delete("/:id", userController.deleteUser);
router.get("/:id/history", userController.getUserHistory);
router.get("/:id/events", userController.getUserEvents);
router.post("/:id/avatar", userController.updateAvatar)


export default router;
