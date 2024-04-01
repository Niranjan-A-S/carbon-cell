import { RequestHandler } from "express";
import { publicAPIService } from "../services/public-api-service";
import { APIError } from "../lib/api-error";
import { APIResponse } from "../lib/api-response";

export const getEntriesList: RequestHandler<any, any, any, { limit: number }> = async (req, res, next) => {
    try {
        let { data, error } = await publicAPIService.getAllEntries();
        if (!data || error) throw new APIError(404, error);

        const { limit } = req.query;
        let message = 'Fetched all entries';
        if (limit !== undefined && limit !== null) {
            if (limit > data.count) {
                message = 'Specified limit is greater than number of entries, hence fetched all entries';
            } else {
                data = { count: limit, entries: data.entries.slice(0, limit) };
                message = limit === 1 ? `Fetched single entry` : `Fetched ${limit} entries`;
            }
        }
        return res
            .status(200)
            .json(new APIResponse(message, 200, data));
    } catch (error) {
        next(error)
    }
}

export const getRandomEntry: RequestHandler<any, any, any, { category: string }> = async (req, res, next) => {
    try {
        const { category } = req.query
        if (!category) throw new APIError(400, 'Category is required')

        const { data, error } = await publicAPIService.getEntriesBasedOnCategory(category as string);
        if (!data || error) throw new APIError(404, error);

        return res
            .status(200)
            .json(new APIResponse(`Random entry based on category ${category}`, 200, data));

    } catch (error) {
        next(error);
    }
}

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const { data, error } = await publicAPIService.getAllCategories();
        if (!data || error) throw new APIError(404, error);
        return res
            .status(200)
            .json(new APIResponse('Fetched all categories', 200, data));
    } catch (error) {
        next(error);
    }
}
