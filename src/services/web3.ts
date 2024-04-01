import Web3 from "web3";

declare global {
    namespace web3 {
        const web3Service: Web3
    }
}

export const web3Service = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`));
