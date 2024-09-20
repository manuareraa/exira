import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function HeroCards() {
  const cardData = [
    {
      sharesAvailable: "347,250",
      properties: "4355",
      startingFrom: "$400",
      location: "New York",
    },
    {
      sharesAvailable: "347,250",
      properties: "4355",
      startingFrom: "$400",
      location: "New York",
    },
    {
      sharesAvailable: "347,250",
      properties: "4355",
      startingFrom: "$400",
      location: "New York",
    },
  ];

  return (
    <div className="flex flex-col max-w-full md:flex-row md:gap-x-8 gap-y-8">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-start w-full p-6 rounded-2xl bg-beta gap-y-6 md:w-1/3"
        >
          {/* Shares Available */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faArrowTrendUp} />
              <p className="text-2xl md:text-4xl">{card.sharesAvailable}</p>
            </div>
            <p className="text-base md:text-lg">Shares Available</p>
          </div>

          {/* Properties */}
          <div className="flex flex-col items-start">
            <p className="text-5xl font-bold md:text-7xl">{card.properties}</p>
            <p className="text-base md:text-lg">Properties</p>
          </div>

          {/* Bottom Container */}
          <div className="w-full">
            <p className="text-lg md:text-2xl">
              Starting from{" "}
              <span className="font-bold">{card.startingFrom}</span>
            </p>
            <div className="h-[1px] bg-black/10 my-2"></div>
            {/* Location */}
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="text-base md:text-lg">{card.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroCards;
