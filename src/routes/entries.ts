import express from "express";
import { requiresAuthenticated } from "../middlewares/auth-middleware";
import { getCategoriesController, getEntriesListController, getRandomEntryController } from "../controllers/entries";

const router = express.Router();

router.route('/list').get(requiresAuthenticated, (getEntriesListController as any));
router.route('/random').get(requiresAuthenticated, getRandomEntryController);
router.route('/categories').get(requiresAuthenticated, getCategoriesController);

export { router as entriesRouter }