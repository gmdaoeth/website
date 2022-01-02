import React, { useState } from "react";
import Header from "../components/layout/header";
import gm1 from "./images/gm1.jpeg";

const Migrate = () => {
  const [currentStep, setCurrentStep] = useState<Number>(0);

  const steps = [
    { step: 0, id: "Step 1", name: "Connect your wallet" },
    { step: 1, id: "Step 2", name: "Transfer your old token" },
    { step: 2, id: "Step 3", name: "Mint your new token" },
    { step: 3, id: "Step 4", name: "Complete!" },
  ];

  const ConnectWallet = () => {
    return <div>Connect</div>;
  };

  const TransferToken = () => {
    return <div>Transfer</div>;
  };

  const MintToken = () => {
    return <div>Mint</div>;
  };

  const Complete = () => {
    return <div>Complete!</div>;
  };

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
                <div className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                  <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
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
        {currentStep === 0 && <ConnectWallet />}
        {currentStep === 1 && <TransferToken />}
        {currentStep === 2 && <MintToken />}
        {currentStep === 2 && <Complete />}
      </div>
    </div>
  );
};

export default Migrate;
