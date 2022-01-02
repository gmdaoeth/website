import { ethers } from "ethers";
import TestTokenABI from "../contracts/collections/test/Test.sol/TestToken.json";
import { idToNetwork, Network, NETWORK_LOCAL, NETWORK_MAINNET, NETWORK_ROPSTEN } from "./connector";

const NotImplemented = "0x0000000000000000000000000000000000000000";

export const TEST_CONTRACT_NAME = "contract_test";

const TokenContracts = [TEST_CONTRACT_NAME] as const;
type Contract = typeof TokenContracts[number];

type ContractMap = Record<Contract, ethers.Contract>;

export const TEST_CONTRACT_ADDRESS: Record<Network, string> = {
  [NETWORK_MAINNET]: NotImplemented,
  [NETWORK_LOCAL]: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  [NETWORK_ROPSTEN]: "0x1aE18815df3f418E086A44FF7C12b0F692f88B45",
};

// TODO: Memoize or use
export const getContracts = (
  provider: ethers.providers.Provider | ethers.Signer,
  chainId: number = NETWORK_LOCAL
): ContractMap => {
  const net = idToNetwork(chainId);
  const TestTokenContract = new ethers.Contract(TEST_CONTRACT_ADDRESS[net], TestTokenABI.abi, provider);
  return {
    [TEST_CONTRACT_NAME]: TestTokenContract,
  };
};

export const getContract = (
  provider: ethers.providers.Provider | ethers.Signer,
  chainId: number = NETWORK_LOCAL,
  contract: Contract
): ethers.Contract => {
  return getContracts(provider, chainId)[contract];
};
