import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

import Header from "../components/layout/header";

import tokenImg from "./images/gm1.jpeg";
import boxImg from "./images/box.png";
import boxImgDark from "./images/box-dark.png";
import heroimg from "./images/fjall.png";

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
      <div className="bg-cover bg-no-repeat drop-shadow-md" style={{ backgroundImage: bgImageUrl }}>
        <Header />
        <div className="max-w-7xl h-full mx-auto pb-20 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-50 h-4/5 mt-12">
            <div
              className="max-h-[128px] md:max-h-[256px] lg:max-h-[512px] flex justify-center relative"
              onClick={changeMode}
            >
              <div className="absolute top-[32px] md:top-[64px] lg:top-[128px] flex">
                <div
                  className={classnames(
                    mode === Morning ? "text-gray-50" : "text-black",
                    "text-[3rem] leading-[3rem] md:text-[6rem] md:leading-[6rem] lg:text-[12rem] lg:leading-[12rem] font-semibold text-shadow-md font-serif align-middle"
                  )}
                >
                  <TextTransition
                    className="select-none"
                    text={mode === Morning ? "gm." : "gn."}
                    springConfig={presets.molasses}
                  />
                </div>
              </div>
              <img className=" object-contain" src={mode === Morning ? boxImg : boxImgDark} />
            </div>
            <p className="mt-8">A Decentralised Autonomous Organization</p>
          </div>
        </div>
      </div>
      <div id="about" className="max-w-6xl mx-auto py-6 pt-12 text-gray-800">
        <h1 className="text-2xl pb-6 font-semibold">
          Supporting established and upcoming artists by providing a launchpad for their work
        </h1>
        <div className="space-y-4">
          <p className="text-lg">
            With our platform we provide an end-to-end service where everything is managed, from smart contract
            deployment, marketing & revenue generation, as an out of the box solution.
          </p>
          <p>
            Each body of work will be treated as unique scope of work & we strike to deliver an completely tailored
            experience to match you vision, whether that be 1/1’s or collection of 10,000 pieces. Occaecati sit fugiat
            qui mollitia. Iste odio consequatur perspiciatis eos. Voluptatum repudiandae dolorum similique id eaque
            voluptatum totam praesentium. Molestiae laboriosam sed repudiandae aperiam maiores minima accusantium illo
            sint. Et sed et velit est ea molestias corrupti. Sint nesciunt architecto libero deserunt eaque.
          </p>

          <p>
            Dolorum distinctio alias voluptatibus fugit. Voluptas accusamus sapiente quas voluptatum magni sit numquam
            quisquam. Excepturi officiis cupiditate error id temporibus at quis. Consectetur labore necessitatibus atque
            sequi nulla odio corporis voluptatem ab. Cum accusantium natus est incidunt exercitationem dignissimos sunt.
            Nemo excepturi quo.
          </p>

          <p>
            A aut laborum non laudantium voluptas et est aliquam. Vero numquam harum aperiam blanditiis perspiciatis
            eveniet debitis blanditiis officiis. Optio dolore qui earum sapiente qui asperiores pariatur. Quia impedit
            aperiam accusamus occaecati voluptates provident molestias. Corrupti voluptatem praesentium qui quae
            suscipit maiores quas necessitatibus. Officiis cum soluta et nihil nemo laudantium.
          </p>
        </div>
        <div className="my-8">
          <BrandButton text="Apply for the studio" />
        </div>
        <Divider text={"gm"} />
        <h1 id="token" className="text-2xl pb-6 font-semibold">
          The token
        </h1>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-lg">
                To build this community, we created a token. Currently built upon the Rarible platform, and soon to be
                migrated to our own propritary contract, the token will act as your way to gain entry. Beyond that, it
                also give each holder the right to vote on how the comunity evolves & spends funds from the gmDAO.
                Officia id nisi temporibus hic. Voluptatem soluta occaecati tenetur maxime nihil alias deleniti. Aperiam
                eos repudiandae consequatur libero officiis deleniti. Autem ipsa soluta iure et.
              </p>
              <div className="my-8 flex space-x-4">
                <BrandButton text="Get a token" />
                <BrandButton text="Migrate to V2" />
              </div>
            </div>
            <div className="w-full">
              <img src={tokenImg} />
            </div>
          </div>
        </div>
        <Divider text={"ge"} />
        <h1 className="text-2xl pb-6 font-semibold">The team</h1>
        <p>
          Coalescing from across various timezones the gm leadership works to curate experiences and accessibility
          throughout the platform. Comprised of various backrounds throughout technology and artistic circles we
          Voluptatem soluta occaecati tenetur maxime nihil alias deleniti. Aperiam eos repudiandae consequatur libero
          officiis deleniti. Autem ipsa soluta iure et.
        </p>
        <div className="grid grid-cols-4 gap-8 my-8">
          <Profile name="Cyphr" title="Benevolent Dictator" image={tokenImg}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatem saepe, nesciunt veniam culpa omnis
            praesentium molestias nemo sit. Odio praesentium atque impedit asperiores pariatur commodi a in expedita
            dolore.
          </Profile>
          <Profile name="Cyphr" title="Benevolent Dictator" image={tokenImg}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatem saepe, nesciunt veniam culpa omnis
            praesentium molestias nemo sit. Odio praesentium atque impedit asperiores pariatur commodi a in expedita
            dolore.
          </Profile>
          <Profile name="Cyphr" title="Benevolent Dictator" image={tokenImg}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatem saepe, nesciunt veniam culpa omnis
            praesentium molestias nemo sit. Odio praesentium atque impedit asperiores pariatur commodi a in expedita
            dolore.
          </Profile>
          <Profile name="Cyphr" title="Benevolent Dictator" image={tokenImg}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatem saepe, nesciunt veniam culpa omnis
            praesentium molestias nemo sit. Odio praesentium atque impedit asperiores pariatur commodi a in expedita
            dolore.
          </Profile>
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

const BrandButton = ({ text }: { text: string }) => {
  return (
    <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-sm focus:outline-none focus:shadow-outline">
      {text}
    </button>
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
