import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

import Header from "../components/layout/header";

import tokenImg from "./images/gm1.jpeg";
import boxImg from "./images/box.png";
import boxImgDark from "./images/box-dark.png";
import heroimg from "./images/hero2.png";
import { Link } from "react-router-dom";
import BrandButton from "../components/button";

const bgImageUrl = `url('${heroimg}')`;

const classnames = function (...args: string[]) {
  return args.filter(Boolean).join(" ");
};

const Morning = 0;
const Night = 1;

const Home = () => {
  const [mode, setMode] = useState(Morning);

  const changeMode = (event: any) => {
    event.preventDefault();
    setMode(mode === Morning ? Night : Morning);
  };

  return (
    <div>
      <div className="bg-cover bg-no-repeat drop-shadow-md rounded-b-sm" style={{ backgroundImage: bgImageUrl }}>
        <Header />
        <div className="max-w-7xl h-full mx-auto pb-20 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-50 h-4/5 mt-12">
            <div
              className="max-h-[128px] md:max-h-[256px] lg:max-h-[512px] ml-20 mr-20 flex justify-center relative"
              onClick={changeMode}
            >
              <div className="absolute top-[32px] md:top-[64px] lg:top-[128px] flex">
                <div
                  className={classnames(
                    mode === Morning ? "text-gray-50" : "text-black",
                    "text-[3rem] leading-[3rem] md:text-[6rem] md:leading-[6rem] lg:text-[12rem] lg:leading-[12rem] font-semibold text-shadow-hero font-serif align-middle"
                  )}
                >
                  <TextTransition
                    className="select-none"
                    text={mode === Morning ? "gm." : "gn."}
                    springConfig={presets.molasses}
                  />
                </div>
              </div>
              <img className="object-contain shadow-lg w-[512px]" src={mode === Morning ? boxImg : boxImgDark} />
            </div>
            <p className="mt-8 text-shadow-hero">A Decentralised Autonomous Organization</p>
          </div>
        </div>
      </div>
      <div id="about" className="max-w-6xl mx-auto px-6 xl:px-0 py-6 pt-12 text-gray-800">
        <h1 className="text-2xl pb-6 font-semibold">The DAO</h1>
        <div className="space-y-4">
          <Para>
            The gmDAO is a community of NFT collectors, artists & investors created in September 2021 using a fair token
            distribution. Broadly speaking, the DAO was formed based on the principles of etiquette and mutual respect,
            making our community a haven within a typically hostile environment. This ultimately resulted in an
            extremely passionate & engaged member base which we are extremely proud of.
          </Para>
          <Para>
            Structurally the DAO consists of 900 members, the majority active within NFT sector, with backgrounds
            ranging from accredited investors, to renowned generative artists with collections featured on ArtBlocks
            curated.
          </Para>

          <Para>
            Our primary goal is to foster & encourage the development of the NFT space, whether through our own organic
            marketing, seed funding from our treasury or development from within the DAO itself. We also seek to provide
            an edge to our members though information not freely available to the market. Lastly, the gmDAO will launch
            a number of internally managed projects that will act as a revenue source for the community, with our first
            venture set to launch in January 2022.
          </Para>

          <Para>You can learn more about our journey in recent Medium articles linked below.</Para>
          <div>
            <a href="https://gmdao.medium.com/gm-7925b2d899e2" target="_blank">
              <BrandButton text="Read the articles" />
            </a>
          </div>
        </div>
        <Divider text={"gm"} />
        <h1 id="token" className="text-2xl pb-6 font-semibold">
          The token
        </h1>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Para>
                The gm. token is the key to gain access to our private community, but also acts as a governance token
                which entitles the holder to vote & propose the direction of the DAO.
              </Para>

              <Para>
                1000 were initially minted & distributed using a “fair-drop” method, where 10 tokens were allocated
                through daily challenges over the course of 100 days, with any unclaimed tokens on each day being
                burned. This resulted in a final tally of 900 tokens currently in circulation, with a number being
                retained by the treasury.
              </Para>

              <Para>
                gm. tokens can currently only be purchased via the secondary market, linked below, or through community
                programs which will begin early 2022.
              </Para>
              <div className="my-8 flex space-x-4">
                <a href="https://opensea.io/collection/gm-token" target="_blank">
                  <BrandButton text="Get a token" />
                </a>
                <Link to="/migrate-info">
                  <BrandButton text="Migrate to V2" />
                </Link>
              </div>
            </div>
            <div className="w-full">
              <img src={tokenImg} />
            </div>
          </div>
        </div>
        <Divider text={"ge"} />
        <h1 id="projects" className="text-2xl pb-6 font-semibold">
          Our work
        </h1>
        <div className="space-y-8">
          <Para>
            As part of the overall mission of the DAO, we have set out to develop a number of internal initiatives which
            we feel is currently lacking from the NFT ecosystem. These projects are wholly owned and created using
            resources within the community & will serve as our primary mechanism to generate treasury funds.
          </Para>
          <div className="bg-gray-900 rounded-md p-8 text-white shadow-lg">
            <div className="text-3xl cursor-pointer">
              <a href="https://gmstudio.art">gm. studio</a>
            </div>
            <div className="text-sm text-gray-300 mb-8">Launched Feb 2022</div>
            <div className="space-y-4">
              <Para>
                Generative art launchpad built by artists for artists. We provide equal opportunity to each and every
                submission with clear & honest feedback provided directly from our curation panel. We’ve built the
                studio from the ground up using our experience with existing artistic platforms and the challenges they
                present to new artists, namely; extremely long queues & poor communication.
              </Para>
              <Para>Our approach is clear & transparent, with fees & timelines presented upfront.</Para>
              <a href="https://gmstudio.art">
                <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-sm focus:outline-none focus:shadow-outline">
                  Visit the Studio
                </button>
              </a>
            </div>
          </div>
        </div>
        <Divider text={"gn"} />
      </div>
    </div>
  );
};

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="relative my-16">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
      </div>
    </div>
  );
};

type ProfileProps = {
  name: string;
  title: string;
  image: string;
  children: React.ReactNode;
};

const Profile = (props: ProfileProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full" src={props.image} />
          <div className="flex-1 ml-4">
            <h1 className="text-lg font-semibold">{props.name}</h1>
            <p className="text-sm">{props.title}</p>
          </div>
        </div>
        <p className="text-sm">{props.children}</p>
      </div>
    </div>
  );
};

export default Home;

const Para = ({ children }: { children: React.ReactNode }) => {
  return <p className="leading-relaxed">{children}</p>;
};
