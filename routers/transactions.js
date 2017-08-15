import express from "express";
import transactionsController from "../controllers/transactionsController";

const router = express.Router();

router.get("/", transactionsController.getAllTransactions);
router.post("/", transactionsController.addNewTransaction);
router.get("/:id", transactionsController.getTransactioById);
router.put("/:id", transactionsController.changeTransactionInfo);
router.delete("/:id", transactionsController.deleteTransaction);
router.get("/u/:userId", transactionsController.getUserTransaction);

export default router;
