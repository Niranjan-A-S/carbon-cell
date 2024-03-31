import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { getCategories, getEntriesList, getRandomEntry } from "../controllers/entries";

const router = express.Router();

router.route('/list').get(requiresAuthenticated, (getEntriesList as any));
router.route('/random').get(requiresAuthenticated, getRandomEntry);
router.route('/categories').get(requiresAuthenticated, getCategories);

export { router as entriesRouter }