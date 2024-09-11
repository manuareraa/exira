import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function HeroCards(props) {
  return (
    <div className="flex flex-row gap-x-16">
      {/* first card */}
      <div className="flex flex-col items-start p-6 px-10 rounded-2xl bg-black/10 gap-y-6">
        {/* shares available container */}
        <div className="flex flex-col items-start gap-y-">
          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <p className="text-4xl">347,250</p>
          </div>
          <p className="text-lg">Shares Available</p>
        </div>

        {/* properties container */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-7xl">4355</p>
          <p className="text-lg">Properties</p>
        </div>

        {/* bottom container */}
        <div>
          <p className="text-2xl">
            Starting from &nbsp;<span className="font-bold ">$400</span>
          </p>
          <div className="h-[2px] bg-black/10 my-2"></div>
          {/* location container */}

          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-lg">New York</p>
          </div>
        </div>
      </div>

      {/* second card */}
      <div className="flex flex-col items-start p-6 px-10 rounded-2xl bg-black/10 gap-y-6">
        {/* shares available container */}
        <div className="flex flex-col items-start gap-y-">
          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <p className="text-4xl">347,250</p>
          </div>
          <p className="text-lg">Shares Available</p>
        </div>

        {/* properties container */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-7xl">4355</p>
          <p className="text-lg">Properties</p>
        </div>

        {/* bottom container */}
        <div>
          <p className="text-2xl">
            Starting from &nbsp;<span className="font-bold ">$400</span>
          </p>
          <div className="h-[2px] bg-black/10 my-2"></div>
          {/* location container */}

          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-lg">New York</p>
          </div>
        </div>
      </div>

      {/* third card */}
      <div className="flex flex-col items-start p-6 px-10 rounded-2xl bg-black/10 gap-y-6">
        {/* shares available container */}
        <div className="flex flex-col items-start gap-y-">
          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <p className="text-4xl">347,250</p>
          </div>
          <p className="text-lg">Shares Available</p>
        </div>

        {/* properties container */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-7xl">4355</p>
          <p className="text-lg">Properties</p>
        </div>

        {/* bottom container */}
        <div>
          <p className="text-2xl">
            Starting from &nbsp;<span className="font-bold ">$400</span>
          </p>
          <div className="h-[2px] bg-black/10 my-2"></div>
          {/* location container */}

          <div className="flex flex-row items-center gap-x-2">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-lg">New York</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCards;
