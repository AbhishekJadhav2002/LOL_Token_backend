import { ethers } from "ethers";
import { Chains, ContractServices, Contracts } from "../../types";

export default function ContractServices(contracts: Contracts): ContractServices {

    async function getBalanceOf(address: string, chain: Chains): Promise<string> {
        try {
            const contract = contracts[chain];
            if (!contract) throw new Error(`Contract for LOL Token on ${chain} chain not found`)
            if ('balanceOf' in contract && typeof contract.balanceOf === 'function' && 'decimals' in contract && typeof contract.decimals === 'function') {
                const balance = await contract.balanceOf(address);
                const decimals = await contract.decimals();
                return ethers.formatUnits(balance, decimals);
            } else {
                throw new Error(`Contract for LOL Token does not have balanceOf method`)
            }
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    return {
        getBalanceOf,
    }
}