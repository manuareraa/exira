import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { Progress } from "@nextui-org/react";
import Carousel from "../components/animata/Carousel";

const data = [
  { name: "Jan", value: 2000 },
  { name: "Feb", value: 2200 },
  { name: "Mar", value: 2100 },
  { name: "Apr", value: 2800 },
  { name: "May", value: 2600 },
  { name: "Jun", value: 2700 },
];

const PropertyView = () => {
  return (
    <div className="flex flex-col w-full bg-white px-60 md:flex-row">
      {/* left container */}
      <div className="w-full p-6 overflow-y-auto md:w-[60rem] text-left">
        <h1 className="mb-1 text-6xl font-bold">Palmshore Apartments</h1>
        <div className="flex flex-row items-center my-3 mb-2 gap-x-2">
          <div className="px-4 py-2 mr-2 text-sm font-bold text-white bg-green-500 rounded-full">
            Residential
          </div>
          <p className="flex flex-row items-center text-lg text-black">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg">Bengaluru, India</p>
          </p>
        </div>
        <p className="mt-6 mb-6 text-lg leading-tight text-black">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id
        </p>

        <h2 className="mb-0 text-xl font-bold">Property Price</h2>
        <div className="pt-3 pb-4 my-0 divider before:bg-black/10 after:bg-black/10"></div>
        <div className="p-4 mb-6 bg-gray-100 rounded-lg">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h2 className="mb-0 text-xl font-bold">Highlights</h2>
        <div className="pt-3 pb-4 my-0 divider before:bg-black/10 after:bg-black/10"></div>
        <div className="grid grid-cols-2 mb-6 gap-x-4 gap-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="p-6 bg-gray-100 rounded-xl">
              <p className="text-lg text-black">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-0 text-xl font-bold">Image Gallery</h2>
        <div className="pt-3 pb-4 my-0 divider before:bg-black/10 after:bg-black/10"></div>
        <div className="h-40 mb-6 bg-gray-200 rounded-lg">
          <Carousel className="w-min-72 storybook-fix" />
          {/* <Expandable className="w-full min-w-72 storybook-fix" /> */}
        </div>

        <h2 className="mb-0 text-xl font-bold">Location</h2>
        <div className="pt-3 pb-4 my-0 divider before:bg-black/10 after:bg-black/10"></div>
        <div className="p-4 mb-6 bg-gray-100 rounded-xl">
          <p className="p-2 text-xl text-black">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi.
          </p>
        </div>

        <h2 className="mb-0 text-xl font-bold">Documents</h2>
        <div className="pt-3 pb-4 my-0 divider before:bg-black/10 after:bg-black/10"></div>
        <div className="grid w-1/2 grid-cols-1 mb-24 gap-y-2">
          {["Doc 1", "Doc 1", "Doc 1", "Doc 1"].map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-start p-2 px-6 text-lg text-center bg-gray-200 rounded-lg"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              {doc}
            </div>
          ))}
        </div>
      </div>

      {/* sticky container */}
      <div className="w-full p-6 md:w-[40rem] md:sticky md:top-0 md:h-screen">
        <div className="p-8 bg-white rounded-3xl invest-shadow">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-lg text-left text-black">Current Value</p>
              <p className="text-4xl font-bold">
                $ 220,000{" "}
                <span className="text-sm font-normal text-black">USD</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg text-black">Original Value</p>
              <p className="text-4xl font-bold">
                $ 220,000{" "}
                <span className="text-sm font-normal text-black">USD</span>
              </p>
            </div>
          </div>

          <div className="items-center justify-center px-6 py-4 pb-6 my-5 mb-4 gap-y-4 rounded-2xl bg-black/10">
            <div className="flex flex-row items-center justify-between text-lg">
              <p className="">Invested</p>
              <p className="">
                $&nbsp;450,000<span>&nbsp;USD</span>
              </p>
            </div>
            <div className="h-2 mt-2 mb-2 bg-gray-200 rounded-full">
              {/* <div
                className="h-2 bg-black rounded-full"
                style={{ width: "75%" }}
              ></div> */}

              <Progress
                aria-label="Loading..."
                value={60}
                className="max-w-md"
                classNames={{
                  base: "",
                  track: "h-[10px] bg-white",
                  indicator: "bg-black",
                }}
              />
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-lg text-black">Share Price</p>
              <p className="text-3xl font-semibold text-left">
                $ 35 <span className="text-sm font-normal text-black">USD</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg text-black">Available Shares</p>
              <p className="text-3xl font-semibold">
                2477 <span className="text-sm font-normal text-black">USD</span>
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 text-lg text-black">Your Balance: 32,850L</p>
            <input
              type="text"
              placeholder="Enter amount of shares to buy"
              className="w-full px-4 py-2 my-1 text-lg border rounded-lg outline-none bg-black/10"
            />
          </div>

          <button className="w-full py-2 mb-4 text-lg font-normal text-white bg-black border-2 border-black rounded-xl hover:bg-white hover:text-black">
            Invest Now
          </button>

          <div className="flex justify-between mt-1 text-xl">
            <div>
              <p className="font-semibold">Owners</p>
              <p>125</p>
            </div>
            <div>
              <p className="font-semibold">IRR</p>
              <p>23.6%</p>
            </div>
            <div>
              <p className="font-semibold">ARR</p>
              <p>9.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
