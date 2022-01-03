import React, { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../network/connector";
import BrandButton from "../components/button";
import { getGMContract, getGMContractAddress, getRaribleContract } from "../network/contracts";
import { ethers } from "ethers";

const gmTokenID = 706480;

const STEPS = {
  CONNECT: 0,
  TRANSFER: 1,
  MINT: 2,
  COMPLETE: 3,
};

const steps = [
  { step: STEPS.CONNECT, id: "Step 1", name: "Connect your wallet" },
  { step: STEPS.TRANSFER, id: "Step 2", name: "Transfer your old token" },
  { step: STEPS.MINT, id: "Step 3", name: "Mint your new token" },
  { step: STEPS.COMPLETE, id: "Step 4", name: "Complete!" },
];

const Migrate = () => {
  const web3React = useWeb3React<Web3Provider>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPendingTx, setIsPendingTx] = useState(false);

  // Wallet details
  const [address, setAddress] = useState("");

  // State and balances.
  const [currentStep, setCurrentStep] = useState(0);
  const [gmTokenAmount, setGmTokenAmount] = useState(0);
  const [availableMints, setAvailableMints] = useState(0);
  const [newGmTokenAmount, setNewGmTokenAmount] = useState(0);

  const connectWallet = async () => {
    await web3React.activate(injectedConnector);
    setAddress(web3React.account || "");
  };

  const disconnectWallet = async () => {
    await web3React.deactivate();
    setAddress("");
    setCurrentStep(STEPS.CONNECT);
  };

  const resolveAddress = async (addr: string): Promise<void> => {
    try {
      const res = await web3React.library?.lookupAddress(addr);
      setAddress(res || addr);
    } catch (e) {
      setAddress(addr);
    }
  };

  async function loadGMBalance() {
    if (typeof web3React.library === "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3React.library.provider);
    const rarible = getRaribleContract(provider, web3React.chainId);
    try {
      setIsLoading(true);
      const data = await rarible.balanceOf(web3React.account, gmTokenID);
      setGmTokenAmount(data.toNumber());
    } catch (err) {
      console.error(err);
      // Gross but it'll do for now.
      setGmTokenAmount(-1);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadNewGMBalance() {
    if (typeof web3React.library === "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3React.library.provider);
    const gm = getGMContract(provider, web3React.chainId);
    try {
      setIsLoading(true);
      const data = await gm.balanceOf(web3React.account);
      setNewGmTokenAmount(data.toNumber());
    } catch (err) {
      console.error(err);
      // Gross but it'll do for now.
      setNewGmTokenAmount(-1);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAvailableMints() {
    if (typeof web3React.library === "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3React.library.provider);
    const gm = getGMContract(provider, web3React.chainId);
    try {
      setIsLoading(true);
      const available = await gm.sentV1Tokens(web3React.account);
      setAvailableMints(available.toNumber());
    } catch (err) {
      console.error(err);
      setAvailableMints(-1);
    } finally {
      setIsLoading(false);
    }
  }

  async function doTransfer() {
    if (typeof web3React.library === "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3React.library.provider);
    const signer = provider.getSigner();
    const rarible = getRaribleContract(signer, web3React.chainId);
    try {
      setIsLoading(true);
      setIsPendingTx(true);
      const tx = await rarible.safeTransferFrom(
        web3React.account,
        getGMContractAddress(web3React.chainId!),
        gmTokenID,
        1,
        "0x"
      );
      await tx.wait();
      setCurrentStep(STEPS.MINT);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsPendingTx(false);
    }
  }

  async function doMintToken() {
    if (typeof web3React.library === "undefined") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(web3React.library.provider);
    const signer = provider.getSigner();
    const gm = getGMContract(signer, web3React.chainId);
    try {
      setIsLoading(true);
      setIsPendingTx(true);
      const tx = await gm.upgradeToken();
      await tx.wait();
      setCurrentStep(STEPS.COMPLETE);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPendingTx(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (web3React.account) {
      resolveAddress(web3React.account);
      setCurrentStep(STEPS.TRANSFER);
    }
    loadAvailableMints();
    loadNewGMBalance();

    // Tokens to mint, go to mint page.
    if (availableMints !== 0) {
      setCurrentStep(STEPS.MINT);
      return;
    }

    if (newGmTokenAmount > 0 && gmTokenAmount === 0) {
      setCurrentStep(STEPS.COMPLETE);
      return;
    }

    // Connected wallet, go to transfer step.
    if (currentStep === 1) {
      loadGMBalance();
    }
  }, [web3React, currentStep, availableMints, gmTokenAmount, newGmTokenAmount]);

  const ConnectWallet = () => {
    return (
      <div onClick={connectWallet}>
        <BrandButton text={"Connect Wallet"}></BrandButton>
      </div>
    );
  };

  const TransferToken = () => {
    if (gmTokenAmount === 0) {
      return (
        <div className="text-red-600">
          It doesn't look like you have any gm tokens to migrate. If you think this is wrong, please post in
          #migraton-support in Discord.
        </div>
      );
    }
    if (gmTokenAmount === -1) {
      return (
        <div className="text-red-600">There was an error loading your token balance. Please try again shortly.</div>
      );
    }
    return (
      <div>
        <p className="mb-4">You have {gmTokenAmount} gm token(s) to migrate.</p>
        <div onClick={doTransfer}>
          <BrandButton text="Transfer your token" />
        </div>
      </div>
    );
  };

  const MintToken = () => {
    if (availableMints >= 1) {
      return (
        <div className="space-y-4">
          <p>You have {availableMints} token(s) available to mint.</p>
          <div onClick={doMintToken}>
            <BrandButton text="Mint your token" />
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>It doesn't look like you have any tokens available to mint.</p>
      </div>
    );
  };

  const Complete = () => {
    return (
      <div>
        Mint complete! gm. You will be able to view your token on OpenSea, but it may take a few minutes to display.
      </div>
    );
  };

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

  const getStep = () => {
    switch (currentStep) {
      case STEPS.CONNECT:
        return <ConnectWallet />;
      case STEPS.TRANSFER:
        return <TransferToken />;
      case STEPS.MINT:
        return <MintToken />;
      case STEPS.COMPLETE:
        return <Complete />;
      default:
        return <div>Unknown step</div>;
    }
  };

  // const displayAddress = hasResolvedAddress ?

  return (
    <div className="max-w-7xl h-full mx-auto pb-20 sm:px-6 lg:px-8 text-gray-900 mt-12">
      <div className="mb-8 space-y-4">
        <h1 className="font-bold text-2xl">Token migration</h1>
      </div>
      <div aria-label="Progress" className="mb-8">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > step.step ? (
                <div className="group pl-4 py-2 flex flex-col border-l-4 border-green-600 hover:green-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                  <span className="text-xs text-green-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === step.step ? (
                <div
                  className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                  aria-current="step"
                >
                  <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                  <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-gray-50 rounded-md p-8 text-gray-900 shadow-lg">
        {address && <p className="text-sm mb-4">Connected as {address}</p>}
        {isLoading ? (
          isPendingTx ? (
            <p className="text-sm mb-4">Waiting for transaction to complete...</p>
          ) : (
            <p className="text-sm mb-4">Loading...</p>
          )
        ) : (
          getStep()
        )}
      </div>
    </div>
  );
};

export default Migrate;
