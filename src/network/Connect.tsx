import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injectedConnector } from "./connector";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

type ConnectProps = {};

const getDisplayAbbreviatedAddress = (address: string | undefined | null) => {
  if (address) {
    return address.slice(0, 5) + "..." + address.slice(-3);
  }
};

const Connect = (props: ConnectProps) => {
  const web3React = useWeb3React<Web3Provider>();
  const [address, setAddress] = useState("");
  const [hasResolvedAddress, setHasResolvedAddress] = useState(false);

  const connectWallet = async () => {
    await web3React.activate(injectedConnector);
    setAddress(web3React.account || "");
  };

  const disconnectWallet = async () => {
    web3React.deactivate();
  };

  const resolveAddress = async (addr: string): Promise<void> => {
    const res = await web3React.library?.lookupAddress(addr);
    if (res) {
      setHasResolvedAddress(true);
    }
    setAddress(res || addr);
  };

  useEffect(() => {
    if (web3React.account) {
      resolveAddress(web3React.account);
    }
  }, [web3React]);

  if (web3React.error && web3React.error instanceof UnsupportedChainIdError) {
    return (
      <button
        className="opacity-95 hover:opacity-100 bg-red-900 px-3 py-2 cursor-pointer rounded-md"
        onClick={disconnectWallet}
      >
        Unsupported chain (eth only)
      </button>
    );
  }

  if (!web3React.account) {
    return (
      <button
        className="opacity-95 hover:opacity-100 border border-white px-3 py-2 cursor-pointer rounded-md"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    );
  }

  const displayAddr = hasResolvedAddress ? address : getDisplayAbbreviatedAddress(address);
  return <p className="text-gray-50">{displayAddr}</p>;
};

export default Connect;
