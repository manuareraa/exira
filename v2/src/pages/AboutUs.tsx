import React from "react";

function AboutUs(props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-y-3">
        <div className="text-3xl">Our Vision</div>
        <div className="flex flex-col gap-y-0">
          <p className="font-black text-8xl">Real Estate</p>
          <p className="font-black text-8xl">For Everyone</p>
        </div>
        <p className="text-2xl text-center w-[80rem] mt-2">
          We envision a world where real estate investment isn’t limited to a
          select few, but a powerful tool for everyone to build wealth. Our
          platform allows people from all walks of life to invest in premium
          properties, unlocking financial freedom and growth.
        </p>
      </div>

      {/* our values */}
      <div className="flex flex-col mt-16">
        <p className="text-3xl">Our Values</p>
        <div className="flex flex-row items-center mt-5 gap-x-36">
          <p className="text-5xl font-black w-[18rem]">Transparency.</p>
          <p className="text-5xl font-black w-[18rem]">Accessibility.</p>
          <p className="text-5xl font-black w-[18rem]">Security.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
