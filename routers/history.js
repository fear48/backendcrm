const express = require("express");
const historyController = require("../controllers/historyController");

const router = express.Router();

router.get("/", historyController.getAllHistory);
router.post("/", historyController.addNewHistory);
router.get("/:id", historyController.getHistoryById);
router.put("/:id", historyController.changeHistoryInfo);
router.delete("/:id", historyController.deleteHistory);

module.exports = router;
