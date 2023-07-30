import { Router } from "express";
import { transactionsControllers } from "../config/initializers";

const { getBalance, getTransactions } = transactionsControllers;

const transactionRouter = Router();

transactionRouter.get("/balance/:chain/:address", getBalance);
transactionRouter.get("/transactions/:chain/:address", getTransactions);

export default transactionRouter;