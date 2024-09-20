import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import solanaLogo from "../assets/img/solanaLogo.png";
import heroImage from "../assets/img/hero.png";
import HeroCards from "../components/custom/HeroCards";
import {
  faArrowUpRightDots,
  faFolderOpen,
  faHandHoldingDollar,
  faShieldHalved,
  faUserCheck,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import PriceBar from "../components/animata/PriceBar";
import Footer from "../components/custom/Footer";

function Home() {
  return (
    <div className="flex flex-col">
      {/* Top hero container */}
      <div className="container flex flex-col items-center justify-between px-4 mx-auto space-y-8 md:flex-row md:space-x-4 md:space-y-0">
        {/* Left container */}
        <div className="flex flex-col items-start pl-4 text-left md:pl-8 gap-y-6">
          {/* Text container */}
          <div>
            <div className="mb-3 text-3xl md:text-3xl lg:text-3xl">
              The New Age of Investment
            </div>
            <div className="flex flex-col text-5xl gap-y-3 md:text-6xl lg:text-7xl">
              <div className="font-bold">Own Real Estate Shares</div>
              <div className="font-bold">Own the Future</div>
            </div>
          </div>

          {/* Button container */}
          <div className="flex flex-row my-3 gap-x-4 md:gap-x-8">
            <button className="px-4 py-2 md:px-6 md:py-3 text-black bg-alpha border-[3px] w-40 md:w-48 border-gamma rounded-full hover:bg-gamma hover:text-white">
              Get Started
            </button>
            <button className="px-4 py-2 md:px-6 md:py-3 text-white bg-gamma border-[3px] w-40 md:w-48 border-gamma rounded-full hover:bg-alpha hover:text-black">
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
      <div className="flex flex-col items-center justify-center w-full px-4 mt-8 mb-40 md:px-8">
        <HeroCards />
      </div>

      {/* secure choice container */}
      <div className="container flex flex-col items-center justify-center gap-8 mx-auto md:flex-row my-28 md:gap-x-20">
        {/* Left container */}
        <div className="flex flex-col items-start">
          <p className="text-4xl font-bold">Real Estate: The Secure Choice</p>
          <p className="max-w-lg text-lg text-center lg:text-left md:text-left">
            While stock markets fluctuate, real estate offers a reliable and
            safer investment option.
          </p>
        </div>
        {/* Right container */}
        <div className="flex flex-col items-center justify-center px-4 lg:px-0 md:px-0 gap-y-4 md:gap-y-3">
          {[
            {
              icon: faUserCheck,
              text: "Fractional Ownership, Full Potential",
            },
            {
              icon: faShieldHalved,
              text: "Property-Backed Security",
            },
            {
              icon: faFolderOpen,
              text: "Diversify with Ease",
            },
            {
              icon: faHandHoldingDollar,
              text: "Flexible for Every Investor",
            },
            {
              icon: faArrowUpRightDots,
              text: "Stable Growth, Less Risk",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between w-full max-w-xl p-4 md:px-8 gap-x-4 md:gap-x-20 rounded-2xl bg-black/10"
            >
              <div className="flex flex-row items-center gap-x-4">
                <FontAwesomeIcon icon={item.icon} size="xl" />
                <p className="text-md md:text-xl">{item.text}</p>
              </div>
              <button className="p-2 px-6 py-2 font-bold text-white bg-black border-2 rounded-full md:py-3 hover:bg-white hover:border-black hover:text-black">
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* blockchain container */}
      <div className="container flex flex-col items-center justify-center mx-auto my-28">
        <div className="flex flex-col text-center gap-y-2">
          <p className="text-4xl font-bold">Powered by Solana</p>
          <p className="max-w-2xl px-8 text-lg leading-tight md:px-0 lg:px-0">
            Our platform is currently being developed on Solana as part of the
            ongoing hackathon. Solana's high speed and low fees make it the
            perfect foundation for our vision. Stay tuned as we leverage the
            power of Solana to deliver a seamless experience.
          </p>
        </div>

        {/* logo container */}
        <div className="px-10 py-4 my-8 bg-black rounded-2xl">
          <img src={solanaLogo} alt="placeholder" className="w-40 h-auto" />
        </div>
      </div>

      {/* crypto for everyone container */}
      <div className="container flex flex-col justify-center mx-auto md:flex-row gap-x-10 my-28">
        {/* Left container */}
        <div className="flex flex-col px-6 lg:px-0 md:px-0 gap-y-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-4xl font-bold text-center lg:text-left md:text-left">
              Seamless Crypto for Everyone
            </p>
            <p className="max-w-lg text-lg leading-tight text-center lg:text-left md:text-left">
              No more worries about wallet, lost private key, gas and so on.
              Provest fully abstracts the complexity and give you a seamless
              crypto experience in a secure way. It’s your wallet, your crypto,
              your shares.
            </p>
          </div>
          <div className="flex flex-col mt-3 gap-y-3">
            {[
              "Fully Self-Custodial",
              "Recoverable Wallets",
              "Exportable Private Key",
            ].map((item, index) => (
              <div key={index} className="flex flex-row items-center gap-x-3">
                <div className="flex flex-col items-center justify-center w-10 h-10 bg-black rounded-full ">
                  <p className="text-sm font-bold text-white">{index + 1}</p>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="max-w-md mt-8 text-left">
            <div className="py-0 my-0 divider"></div>
            <div>
              <p className="text-sm italic">
                NOTE: Advanced crypto users who already own a external wallet
                can login with their wallet and invest using the crypto funds
                they own.
              </p>
            </div>
          </div>
        </div>

        {/* Right container */}
        <div className="flex flex-row items-center justify-center mt-8 md:mt-0">
          <ul className="items-start timeline timeline-vertical">
            {[
              "Login with your email",
              "Select Property to Invest",
              "Pay with currency of your choice",
              "Done",
            ].map((item, index) => (
              <li key={index} className="grid grid-cols-1">
                {index !== 0 && <hr />}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={
                    index === 3
                      ? "my-3 border-none crypto-shadow timeline-end timeline-box"
                      : "my-3 border-none crypto-shadow timeline-end timeline-box"
                  }
                >
                  <div className="w-64 px-4 py-3">
                    <p className="text-xl">{item}</p>
                    {index === 2 && (
                      <p className="text-xs">
                        BTC / ETH / POL{" "}
                        <span className="font-bold">&nbsp;(or)&nbsp;</span> USD
                        / EUR / INR
                      </p>
                    )}
                  </div>
                </div>
                {index === 3 ? null : <hr />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* stats container */}
      <div className="container flex flex-col items-center justify-center mx-auto my-28">
        <div>
          <p className="mb-16 text-4xl font-bold">Exira Ecosystem</p>
        </div>
        <div className="grid grid-cols-1 gap-20 gap-y-10 lg:gap-y-0 md:grid-cols-3 md:gap-x-24 md:gap-y-10">
          {[
            { value: "314,577", label: "Active Shareholders" },
            { value: "4894", label: "Properties" },
            { value: "$1,733,578", label: "Avg. Daily Transfers" },
            { value: "$4,750,796", label: "Dividends Paid-out" },
            { value: "32", label: "Global Cities" },
            { value: "6,344,867", label: "Active Shares" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-0"
            >
              <p className="text-4xl font-bold lg:text-6xl md:text-5xl">
                {item.value}
              </p>
              <p className="text-xl">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* properties for everyone container */}
      <div className="container flex flex-col items-center justify-center mx-auto my-28">
        <div className="flex flex-col mb-4 text-center gap-y-0">
          <p className="text-4xl font-bold ">
            Properties for Everyone's Budget
          </p>
          {/* sub heading container */}
          <div className="flex flex-col items-center justify-center my-4">
            <p className="text-md">Show prices in</p>
            <div className="mt-2">
              <PriceBar tabs={["USD", "EUR", "INR"]} />
            </div>
          </div>
        </div>

        {/* cards container */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-12">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex flex-col p-6 gap-y-3 rounded-3xl bg-black/10"
            >
              <p className="text-2xl">From as low as,</p>
              <div className="leading-none">
                <p className="text-6xl font-bold">$30</p>
                <p className="text-lg">per share</p>
              </div>
              <div className="flex flex-col mt-2 gap-y-0">
                <p className="text-3xl">4,566</p>
                <p className="text-md">Shares Available</p>
              </div>
              <button className="p-2 px-16 py-3 mt-3 text-white bg-black border-2 rounded-full hover:bg-white hover:border-black hover:text-black ">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* build wealth container */}
      <div className="px-4">
        <div className="container flex flex-col items-center justify-center w-full px-4 py-12 mx-auto bg-black lg:px-0 md:px-0 rounded-3xl my-28 gap-y-3">
          <div className="flex flex-col text-center">
            <p className="text-2xl font-bold text-white lg:text-3xl md:text-3xl">
              Start building wealth from today
            </p>
            <p className="text-lg text-white">
              Real estate shares are the key to building lasting wealth. Begin
              your journey with us now.
            </p>
          </div>
          <button className="p-2 px-16 py-3 mt-3 text-black bg-white border-2 rounded-full hover:bg-black hover:border-white hover:text-white ">
            Get Started
          </button>
        </div>
      </div>

      {/* ask doubts container */}
      <div className="container flex flex-col items-center justify-center px-6 mx-auto lg:px-0 md:px-0 mb-44 my-28">
        {/* header */}
        <div className="flex flex-col text-center gap-y-2">
          <p className="text-4xl font-bold">Have doubts?</p>
          <p className="max-w-lg text-lg leading-tight">
            Get all your doubts cleared and start investing from now. You can
            find how the investment flow works and other legal documents in the
            How it works? section.
          </p>
        </div>

        {/* double cards */}
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
          {[
            {
              title: "AI",
              description:
                "Chat with our AI-powered Chatbot to get answers to all your questions instantly",
              buttonText: "Chat Now",
            },
            {
              title: "@",
              description: "Drop us a mail and we’ll get back to you shortly",
              buttonText: "Send Mail",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full p-6 gap-y-3 rounded-3xl bg-black/10 h-72"
            >
              <p className="text-5xl">{item.title}</p>
              <p className="text-md">{item.description}</p>
              <button className="w-full p-2 py-3 mt-3 text-white bg-black border-2 rounded-full hover:bg-white hover:border-black hover:text-black">
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Home;
