import { RequestHandler } from "express";
import { APIError } from "../lib/api-error";
import { APIResponse } from "../lib/api-response";
import { web3Service } from "../services/web3";

export const getEthereumBalance: RequestHandler<any, any, any, { address: string }> = async (req, res, next) => {
    try {
        const { address } = req.query;
        if (!address) throw new APIError(400, 'Ethereum Address is required');

        if (!web3Service.utils.toChecksumAddress(address)) throw new APIError(400, 'Invalid Ethereum address');

        const balance = await web3Service.eth.getBalance(address);
        const etherBalance = web3Service.utils.fromWei(balance, 'ether');

        return res.status(200).json(new APIResponse('Ethereum balance fetched successfully ', 200, { balance: etherBalance }));
    } catch (error) {
        next(error)
    }
}