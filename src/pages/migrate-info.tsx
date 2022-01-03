import React from "react";
import { Link } from "react-router-dom";
import BrandButton from "../components/button";
import gm1 from "./images/gmnew1.jpeg";
import gm2 from "./images/gmnew2.jpeg";
import gm3 from "./images/gmnew3.jpeg";

const MigrateInfo = () => {
  return (
    <div className="max-w-7xl h-full mx-auto pb-20 sm:px-6 lg:px-8 text-gray-900 mt-12">
      <div className="mb-8 space-y-4">
        <h1 className="font-bold text-2xl">Token migration</h1>
        <p>We are migrating our DAO token from the exisitng Rarible contract, to a brand new custom contract.</p>
        <p>
          Your new token will have generative artwork created by{" "}
          <a className="italic" href="https://twitter.com/rich__poole">
            Rich Poole
          </a>
          . Here are some examples:
        </p>
        <div className="flex justify-between space-x-12">
          <div className="shadow-lg">
            <img className="bg-contain" src={gm2}></img>
          </div>
          <div className="shadow-lg">
            <img className="bg-contain" src={gm1}></img>
          </div>
          <div className="shadow-lg">
            <img className="bg-contain" src={gm3}></img>
          </div>
        </div>

        <h1 className="font-bold text-2xl">How it works</h1>
        <div>
          The migration is a two step process. Please note,{" "}
          <strong>this means that you will need to do 2 transactions.</strong>
          We have attempted to minimize gas where possible.
          <ol className="space-y-4 list-decimal my-4 ml-8">
            <li>
              First, you must transfer your existing token to our new contract. The contract will record the transfer
              and credit your address with the ability to mint a new token.
            </li>
            <li>You are then free to mint a new token at any time whilst the migration is ongoing.</li>
          </ol>
          <p>You must complete both steps to complete the migration and retain access to the DAO.</p>
          <p>If you have any questions, please ask in Discord.</p>
        </div>

        <div className="mb-8 space-y-4">
          <Link to="/migrate">
            <BrandButton text="Get started" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MigrateInfo;
