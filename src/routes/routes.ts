import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { getEthereumBalance } from "../controllers/web3";

const router = express.Router()

router.route('/balance').get(requiresAuthenticated, getEthereumBalance)

export { router as web3Router }