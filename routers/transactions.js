const express = require("express");
const transactionsController = require("../controllers/transactionsController");

const router = express.Router();

router.get("/", transactionsController.getAllTransactions);
router.post("/", transactionsController.addNewTransaction);
router.get("/:id", transactionsController.getTransactioById);
router.put("/:id", transactionsController.changeTransactionInfo);
router.delete("/:id", transactionsController.deleteTransaction);
router.get("/u/:userId", transactionsController.getUserTransaction);

module.exports = router;
