import usePosts from "../../hooks/usePost";
import { CreateIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "./Button";
import { useEffect } from "react";

export function CardPet1() {
  const { getTypeStyle, petData, getAllPetList } = usePosts();

  useEffect(() => {
    getAllPetList();
  }, []);
  // console.log(petData);

  const navigate = useNavigate();

  return (
    <>
      <div className=" bg-etc-white w-full h-fit">
        <div className=" bg-etc-white w-full flex justify-between items-center pb-[60px]">
          <p className=" text-headline3 flex items-center gap-[10px]">
            Your Pet
          </p>
          <ButtonPrimary
            content={"Create Pet"}
            onClick={() => {
              navigate(`/userManagement/:userId/pets/create`);
            }}
          />
        </div>
        <div className="flex flex-wrap ">
          {petData?.map((item, index) => {
            const { textStyle, border, bgColor } = getTypeStyle(item.type);
            const isInvalidType = !["Dog", "Cat", "Bird", "Rabbit"].includes(
              item.type
            );
            return (
              <div
                key={index}
                className="flex mx-[5px]"
                onClick={() => {
                  navigate(`/userManagement/1/pets/${item.id}`);
                }}
              >
                <div
                  id="card"
                  className={`border-gray-200 w-[207px] h-60 p-6 bg-white rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 
               
                  ${isInvalidType ? "opacity-40" : ""} }`}
                >
                  <img
                    className="w-[104px] h-[104px] relative rounded-[99px]"
                    src={item.image_path}
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
  const { getTypeStyle, petData, getAllPetList } = usePosts();

  useEffect(() => {
    getAllPetList();
  }, []);

  return (
    <>
      <div className=" bg-etc-white p-10 w-full h-fit">
        <p className="mb-4 text-body2">Choose your pet</p>
        <div className="flex flex-wrap relative">
          {petData?.map((item, index) => {
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
                    src={item.image_path}
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
