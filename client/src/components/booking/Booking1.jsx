import { useState } from "react";
import { CreateIcon } from "../systemdesign/Icons";

const data = [
  {
    name: "Bubba",
    type: "Dog",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    name: "Daisy",
    type: "Dog",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    name: "I Som",
    type: "Cat",
    image: "https://bit.ly/fcc-relaxing-cat",
  },
  {
    name: "Noodle Birb",
    type: "Bird",
    image: "https://i.stack.imgur.com/Cb5uv.jpg",
  },
  {
    name: "Toffe",
    type: "Super Dog",
    image: "https://cdn.pic.in.th/file/picinth/S__164773890.th.jpeg",
  },
];

function booking1() {
  return (
    <>
      <div className=" bg-etc-white p-10 w-full h-fit">
        <p className="mb-4 text-body2">Choose your pet</p>
        <div className="flex flex-wrap relative">
          {data.map((item, index) => {
            return (
              <div key={index} className="flex mr-[14px]">
                <div
                  id="card"
                  className={`border-gray-200 w-60 h-60 p-6 bg-white rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 ${
                    selectedButtons.includes(index) ? "border-orange-500" : ""
                  } ${isInvalidType ? "opacity-40" : ""} }`}
                >
                  <img
                    className="w-[104px] h-[104px] relative rounded-[99px]"
                    src={item.image}
                  />
                  <div className="self-stretch h-[68px] flex-col  items-center gap-2 flex">
                    <div className="self-stretch text-center text-headline4">
                      {item.name}
                    </div>
                    <div
                      className={`px-4 py-1 rounded-[99px] justify-center items-center gap-2.5 inline-flex border ${textStyle} ${border} ${bgColor}`}
                    >
                      <div className="">{item.type}</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="checkbox absolute top-3 right-3 hover:border-orange-300 "
                  />
                </div>
              </div>
            );
          })}
          <div className="border-gray-200 w-60 h-60 p-6 rounded-2xl border border-zinc-200 relative mb-4 bg-orange-100">
            <div className=" flex flex-col items-center mt-10">
              <button>
                <CreateIcon />
              </button>
              <p className="text-orange-500 text-bodyButton px-6 py-3">
                Create New Pet
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default booking1;
