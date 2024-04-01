import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { getEthereumAccountBalance } from "../controllers/web3";

const router = express.Router()

router.route('/balance').get(requiresAuthenticated, getEthereumAccountBalance)

export { router as web3Router }