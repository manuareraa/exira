import heroImage from "../assets/img/hero.png";
import HeroCards from "../components/custom/HeroCards";

function Home() {
  return (
    <div className="flex flex-col">
      {/* Top hero container */}
      <div className="container flex flex-col items-center justify-between px-4 mx-auto space-y-8 md:flex-row md:space-x-4 md:space-y-0">
        {/* Left container */}
        <div className="flex flex-col items-start pl-4 text-left md:pl-8 gap-y-6">
          {/* Text container */}
          <div>
            <div className="mb-3 text-3xl md:text-4xl">
              The New Age of Investment
            </div>
            <div className="flex flex-col text-5xl gap-y-3 md:text-8xl">
              <div className="font-bold">Own Real Estate Shares</div>
              <div className="font-bold">Own the Future</div>
            </div>
          </div>

          {/* Button container */}
          <div className="flex flex-row my-3 gap-x-4 md:gap-x-8">
            <button className="px-4 py-2 md:px-6 md:py-3 text-black bg-white border-[3px] w-40 md:w-48 border-black rounded-full hover:bg-black hover:text-white">
              Get Started
            </button>
            <button className="px-4 py-2 md:px-6 md:py-3 text-white bg-black border-[3px] w-40 md:w-48 border-black rounded-full hover:bg-white hover:text-black">
              Get Started
            </button>
          </div>
        </div>

        {/* Right container */}
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          <img
            src={heroImage}
            alt="placeholder"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Bottom container */}
      <div className="flex flex-col items-center justify-center w-full px-4 mt-8 md:px-8">
        <HeroCards />
      </div>
    </div>
  );
}

export default Home;
