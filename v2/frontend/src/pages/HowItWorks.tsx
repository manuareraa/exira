import React from "react";

import howitworks from "../assets/img/how it works.svg";
import Footer from "../components/custom/Footer";

function HowItWorks(props) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      {/* heading */}
      <div className="flex flex-col items-center justify-center mt-12 gap-y-4">
        <h1 className="text-5xl font-bold">How it works?</h1>
      </div>

      {/* content */}
      <div className="mt-16 mb-36">
        <img src={howitworks} alt="how it works" />
      </div>

      <Footer />
    </div>
  );
}

export default HowItWorks;
