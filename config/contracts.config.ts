import { ethers } from "ethers";
import { Chains, Contracts, NODE_ENV, Providers } from "../types";
import { LOLAbi } from "../types/contracts";
import abi from './abi/LOL.abi.json';
import { tokens } from './data';

export const providers: Providers = {
  bsc: new ethers.WebSocketProvider(process.env.BSC_WSS_URL as string),
  eth: new ethers.WebSocketProvider(process.env.ETH_WSS_URL as string),
}

export const createContractInstance = (chain: Chains, _provider?: ethers.Provider): LOLAbi => {
  const provider = _provider || providers[chain];

  const signer = new ethers.Wallet(
    process.env.ADMIN_PRIVATE_KEY as string,
    provider,
  )

  const contract = new ethers.Contract(
    tokens[process.env.NODE_ENV as NODE_ENV][chain].contract,
    abi,
    signer,
  ) as unknown as LOLAbi;

  return contract.connect(signer);
};

const contracts: Contracts = {
  bsc: createContractInstance("bsc"),
  eth: createContractInstance("eth"),
};

console.log('✅ Contract instances have been generated');

export default contracts;