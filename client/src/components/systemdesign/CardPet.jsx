import usePosts from "../../hooks/usePost";
import { CreateIcon } from "./Icons";

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
  {
    name: "Bubba",
    type: "Dog",
    image: "https://picsum.photos/id/237/200/300",
  },
];

export function CardPet1() {
  const { getTypeStyle } = usePosts();

  return (
    <>
      <div className=" bg-etc-white w-full h-fit">
        <div className="flex flex-wrap j">
          {data.map((item, index) => {
            const { textStyle, border, bgColor } = getTypeStyle(item.type);
            const isInvalidType = !["Dog", "Cat", "Bird", "Rabbit"].includes(
              item.type
            );
            return (
              <div key={index} className="flex mx-[5px]">
                <div
                  id="card"
                  className={`border-gray-200 w-[207px] h-60 p-6 bg-white rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 
               
                  ${isInvalidType ? "opacity-40" : ""} }`}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CardPet2(props) {
  const { getTypeStyle } = usePosts();

  return (
    <>
      <div className=" bg-etc-white p-10 w-full h-fit">
        <p className="mb-4 text-body2">Choose your pet</p>
        <div className="flex flex-wrap relative">
          {data.map((item, index) => {
            const { textStyle, border, bgColor } = getTypeStyle(item.type);
            const isInvalidType = !["Dog", "Cat", "Bird", "Rabbit"].includes(
              item.type
            );
            return (
              <div key={index} className="flex mr-[14px]">
                <div
                  id="card"
                  className={`border-gray-200 w-60 h-60 p-6 bg-white rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 
                  ${
                    props.selectedButtons.includes(index)
                      ? "border-orange-500"
                      : ""
                  }
                  ${isInvalidType ? "opacity-40" : ""} }`}
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
                  {props.children(index, isInvalidType)}
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
