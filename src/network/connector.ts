import { InjectedConnector } from "@web3-react/injected-connector";

export const NETWORK_MAINNET = 1;
export const NETWORK_ROPSTEN = 3;
export const NETWORK_LOCAL = 1337;

const Networks = [NETWORK_MAINNET, NETWORK_ROPSTEN, NETWORK_LOCAL] as const;
export type Network = typeof Networks[number];

export const idToNetwork = (id: number): Network => {
  switch (id) {
    case NETWORK_MAINNET:
      return NETWORK_MAINNET;
    case NETWORK_ROPSTEN:
      return NETWORK_ROPSTEN;
    case NETWORK_LOCAL:
      return NETWORK_LOCAL;
    default:
      throw new Error(`Unknown network id: ${id}`);
  }
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [NETWORK_MAINNET, NETWORK_ROPSTEN, NETWORK_LOCAL],
});
