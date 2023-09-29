import usePosts from "../../hooks/usePost";
import { CreateIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "./Button";
import { useEffect } from "react";
import { useAuth } from "../../contexts/authentication";
import { UploadPetImage } from "./uploadImage";
export function CardPet1() {
  const { getTypeStyle, petData, getAllPetList } = usePosts();
  const { userData } = useAuth();

  useEffect(() => {
    getAllPetList();
  }, [petData]);
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
              navigate(`/userManagement/${userData.id}/pets/create`);
            }}
          />
        </div>
        <div className="flex flex-wrap ">
          {petData?.map((item, index) => {
            // console.log(petData);
            const { textStyle, border, bgColor } = getTypeStyle(item.type);
            const isInvalidType = !["Dog", "Cat", "Bird", "Rabbit"].includes(
              item.type
            );
            return (
              <div
                key={index}
                className="flex mx-[5px] cursor-pointer"
                onClick={() => {
                  // console.log(item.id);
                  navigate(`/userManagement/${userData.id}/pets/${item.id}`);
                }}
              >
                <div
                  id="card"
                  className={`hover:border-orange-400 hover:shadow-lg border-gray-200 w-[207px] h-60 p-6 bg-white rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 
                  ${isInvalidType ? "opacity-40" : ""} }`}
                >
                  {item.image_path !== "none" ? (
                    <img
                      className="w-[104px] h-[104px] relative rounded-[99px] object-cover"
                      src={item.image_path}
                    />
                  ) : (
                    <UploadPetImage cardWidth="104px" hidden="hidden" />
                  )}

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
  const { userData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getAllPetList();
  }, [petData]);

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
                  className={`border-gray-200 w-60 h-60 p-6 bg-white hover:border-orange-400 hover:shadow-lg cursor-pointer rounded-2xl border focus:border-orange-500 flex-col justify-between items-center gap-4 inline-flex relative mb-4 
                  ${
                    props.selectedButtons.includes(index)
                      ? "border-orange-500"
                      : ""
                  }
                  ${isInvalidType ? "opacity-40" : ""} }`}
                >
                  {item.image_path !== "none" ? (
                    <img
                      className="w-[104px] h-[104px] relative rounded-[99px] object-cover"
                      src={item.image_path}
                    />
                  ) : (
                    <UploadPetImage cardWidth="104px" hidden="hidden" />
                  )}
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
                  {props.children(index, isInvalidType, item.id, item.name)}
                </div>
              </div>
            );
          })}
          <div
            className="border-gray-200 w-60 h-60 p-6 rounded-2xl cursor-pointer hover:border-orange-400 hover:shadow-lg border border-zinc-200 relative mb-4 bg-orange-100"
            onClick={() => {
              navigate(`/userManagement/${userData.id}/pets/create`);
            }}
          >
            <div className=" flex flex-col items-center mt-10 ">
              <CreateIcon />

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
