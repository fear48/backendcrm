import express from "express";
import passportController from "../controllers/passportController";

const router = express.Router();

router.post("/registration", passportController.registration);
router.post("/login", passportController.login);

export default router;
