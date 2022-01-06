import { Contract, ethers } from "ethers";
import { idToNetwork, Network, NETWORK_LOCAL, NETWORK_MAINNET, NETWORK_ROPSTEN } from "./connector";
import gmv2 from "./GmV2.json";
import rarible from "./rarible.json";

const NotImplemented = "0x0000000000000000000000000000000000000000";

export const GMV2_ADDRESSES: Record<Network, string> = {
  [NETWORK_MAINNET]: "0x36f4d96fe0d4eb33cdc2dc6c0bca15b9cdd0d648",
  [NETWORK_ROPSTEN]: "0xAE08520582B8CAB06c856DC6348C604895eCB1f7",
  [NETWORK_LOCAL]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};

export const RARIBLE_ADDRESSES: Record<Network, string> = {
  [NETWORK_MAINNET]: "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
  [NETWORK_ROPSTEN]: "0x776a46cCB1629dD11B08fe7fb70e5164e7393f2a",
  [NETWORK_LOCAL]: NotImplemented,
};

export const getGMContractAddress = (chainId: number): string => {
  const net = idToNetwork(chainId);
  return GMV2_ADDRESSES[net];
};

export const getGMContract = (
  provider: ethers.providers.Provider | ethers.Signer,
  chainId: number = NETWORK_LOCAL
): Contract => {
  const net = idToNetwork(chainId);
  return new ethers.Contract(GMV2_ADDRESSES[net], gmv2.abi, provider);
};

export const getRaribleContract = (
  provider: ethers.providers.Provider | ethers.Signer,
  chainId: number = NETWORK_LOCAL
): Contract => {
  const net = idToNetwork(chainId);
  return new ethers.Contract(RARIBLE_ADDRESSES[net], rarible, provider);
};
