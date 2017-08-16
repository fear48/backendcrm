import express from "express";
import userController from "../controllers/userController";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.changeUserInfo);
router.delete("/:id", userController.deleteUser);
router.get("/:id/comments", userController.getUsersComments);
router.post("/:id/comments", userController.addCommentToUser);
router.delete("/:id/comments/:commentId", userController.deleteCommentById);
router.get("/:id/history", userController.getUserHistory);
router.get("/:id/events", userController.getUserEvents);

export default router;
