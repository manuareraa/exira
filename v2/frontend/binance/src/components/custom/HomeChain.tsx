import React from "react";
import binanceLogo from "../../assets/img/binance-t.png";

function HomeChain(props) {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-28">
      <div className="flex flex-col text-center gap-y-2">
        <p className="text-4xl font-bold">
          {/* Made with{" "} */}
          Powered by{" "}
          {/* <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#cb2a2a" }}
              size="xs"
            />{" "} */}
          Binance Smart Chain
        </p>
        <p className="max-w-2xl text-lg leading-tight">
          Our platform is currently being developed on Binance Smart Chain. With
          its high performance and low transaction fees, Binance Smart Chain
          provides the ideal foundation for our vision. Stay tuned as we harness
          the power of Binance Chain to deliver a seamless and efficient
          experience.
        </p>
      </div>

      {/* Logo container */}
      <div className="px-10 py-4 my-8 bg-black rounded-2xl">
        <img src={binanceLogo} alt="Binance Logo" className="h-auto w-72" />
      </div>
    </div>
  );
}

export default HomeChain;
