import { Link } from "react-router-dom";
import gmbg from "./images/gm2.jpeg";
import gmdrop from "./images/gm3.jpeg";

const Home = () => {
  return (
    <>
      <div className="relative bg-black overflow-hidden text-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-black transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative pt-6 px-4 sm:px-6 lg:px-8 hidden md:inline-block">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto"></div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8"></div>
              </nav>
            </div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-50 sm:text-5xl md:text-4xl">
                  <span className="block xl:inline ">The gm club is a</span>{" "}
                  <span className="block grad-primary grad-primary-text xl:inline">
                    Decentralised Autonomous Organisation
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We are a collective of NFT enthusiasts, artists, programmers, collectors and crypto-natives.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="mt-3 sm:mt-0">
                    <a
                      href="https://studio.gmdao.ai"
                      className="w-full flex items-center justify-center py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8d0ffa] hover:bg-[#8c0ffa8f] md:py-4 md:text-lg md:px-10"
                    >
                      See our collections
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={gmbg} alt="" />
        </div>
      </div>
      <div className="mt-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-50">See our latest drop</h2>
                <p className="mt-4 text-lg text-gray-500">
                  Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis bibendum malesuada faucibus lacinia
                  porttitor. Pulvinar laoreet sagittis viverra duis. In venenatis sem arcu pretium pharetra at. Lectus
                  viverra dui tellus ornare pharetra.
                </p>
                <div className="mt-6">
                  <a
                    href="https://studio.gmdao.ai"
                    className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#8d0ffa] hover:bg-[#8c0ffa8f]"
                  >
                    Visit Studio
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src={gmdrop}
                alt="gm studio"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="mt-20 flex flex-col space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-50 mb-2">About the dao</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id velit rhoncus, euismod neque et, aliquet
          elit. Etiam risus urna, molestie eu eros id, volutpat porta mi. Mauris lobortis tortor non lacus lobortis, non
          congue turpis maximus. Morbi interdum neque pulvinar massa malesuada porta. Pellentesque fermentum accumsan
          imperdiet. Phasellus ac malesuada mauris. Aenean tellus odio, maximus eget orci eu, hendrerit pretium dolor.
          Suspendisse accumsan viverra sapien. Suspendisse potenti. Sed viverra urna at tincidunt facilisis. Ut
          condimentum scelerisque nunc, et malesuada diam. Fusce eget arcu mattis, accumsan enim et, malesuada libero.
          Morbi rhoncus ut ante vel tincidunt.
        </p>
        <p>
          Aliquam erat volutpat. Vestibulum varius feugiat sapien, at tempus ligula imperdiet sit amet. Donec egestas
          justo lacus, ac accumsan orci consequat ut. Nulla condimentum massa ut tristique pellentesque. Donec vitae
          neque eu eros aliquet porttitor. Sed eleifend quis tortor vel blandit. Ut porta molestie augue at viverra.
          Donec rhoncus nibh risus, quis posuere justo faucibus ac. Nam venenatis orci a mi placerat ullamcorper.
          Suspendisse laoreet a velit ac mattis. Praesent varius quam risus, non porta enim efficitur id. Aliquam erat
          volutpat. Fusce mi dolor, elementum id lorem a, convallis suscipit nulla. Nulla leo risus, auctor ut sagittis
          sit amet, ultricies eu nunc. Etiam fringilla ligula nec molestie efficitur.
        </p>
      </div>
    </>
  );
};

export default Home;
