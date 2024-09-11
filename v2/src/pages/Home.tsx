import React from "react";

import heroImage from "../assets/img/hero.png";
import HeroCards from "../components/custom/HeroCards";

function Home(props) {
  return (
    <div className="flex flex-col">
      {/* top hero container */}
      <div className="flex flex-row items-center justify-between px-4 space-x-4 space-y-4">
        {/* left container */}
        <div className="flex flex-col items-start pl-8 text-left gap-y-6">
          {/* text container */}
          <div className="">
            <div className="mb-3 text-4xl">The New Age of Investment</div>
            <div className="flex flex-col gap-y-3 text-8xl">
              <div className="font-bold ">Own Real Estate Shares</div>
              <div className="font-bold ">Own the Future</div>
            </div>
          </div>

          {/* button container */}
          <div className="flex flex-row my-3 gap-x-8 gap-">
            <button className="px-6 py-2 text-black bg-white border-[3px] w-48 border-black rounded-full hover:bg-black hover:text-white">
              Get Started
            </button>
            <button className="px-6 py-2 text-white bg-black border-[3px] w-48 border-black rounded-full hover:bg-white hover:text-black">
              Get Started
            </button>
          </div>
        </div>

        {/* right container */}
        <div>
          <img
            src={heroImage}
            alt="placeholder"
            className="h-auto w-[40rem] cover"
          />
        </div>
      </div>
      {/* bottom container */}
      <div className="flex flex-col items-center justify-center w-full px-8">
        <HeroCards />
      </div>
    </div>
  );
}

export default Home;
